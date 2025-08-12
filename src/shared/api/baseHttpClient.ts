export interface HttpClientConfig {
  baseUrl: string
  getAccessToken?: () => string | null | undefined
  onUnauthorized?: () => void
  defaultHeaders?: Record<string, string>
}

export class BaseHttpClient {
  private readonly baseUrl: string
  private readonly getAccessToken?: HttpClientConfig['getAccessToken']
  private readonly onUnauthorized?: HttpClientConfig['onUnauthorized']
  private readonly defaultHeaders: Required<HttpClientConfig['defaultHeaders']>

  constructor(config: HttpClientConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, '')
    this.getAccessToken = config.getAccessToken
    this.onUnauthorized = config.onUnauthorized
    this.defaultHeaders = config.defaultHeaders || {}
  }

  async request<T = unknown>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const requestParams = this.prepareRequestParams(options)
    const url = this.baseUrl + endpoint

    try {
      const response = await fetch(url, requestParams)

      if (response.status === 401 && this.onUnauthorized) {
        this.onUnauthorized()
      }

      if (!response.ok) {
        this.handleNotOkResponse(response)
      }

      return await this.getResponseData<T>(response)
    } catch (error) {
      throw new Error(String(error))
    }
  }

  private async getResponseData<T>(response: Response) {
    const contentType = response.headers.get('content-type') || ''

    if (contentType.includes('application/json')) {
      return (await response.json()) as T
    }
    if (contentType.includes('text/')) {
      return (await response.text()) as T
    }
    return (await response.blob()) as T
  }

  private async handleNotOkResponse(response: Response) {
    let errorPayload: unknown = null
    const contentType = response.headers.get('content-type') || ''

    try {
      if (contentType.includes('application/json')) {
        errorPayload = await response.json()
      } else {
        errorPayload = await response.text()
      }
    } catch {
      console.error('error ocured during parsing error message')
    }

    const message =
      extractErrorMessage(errorPayload) || `HTTP ${response.status}`

    throw new HttpError(message, response.status, errorPayload)
  }

  private prepareRequestParams(options: RequestInit) {
    const { headers, body, ...rest } = options

    const finalHeaders = new Headers({
      ...this.defaultHeaders,
      ...(headers || {}),
    })

    const token = this.getAccessToken?.()

    if (token) {
      finalHeaders.set('Authorization', `Bearer ${token}`)
    }

    if (isJsonLike(body) && !finalHeaders.has('Content-Type')) {
      finalHeaders.set('Content-Type', 'application/json')
    }

    const requestParams: RequestInit = {
      ...rest,
      headers: finalHeaders,
      body: isJsonLike(body)
        ? JSON.stringify(body)
        : (body as BodyInit | null | undefined),
    }

    return requestParams
  }
}

export class HttpError<T = unknown> extends Error {
  public readonly status: number
  public readonly data: T | null

  constructor(message: string, status: number, data: T | null = null) {
    super(message)
    this.name = 'HttpError'
    this.status = status
    this.data = data
  }
}

function isJsonLike(value: unknown): boolean {
  if (typeof value !== 'object') return false
  if (value instanceof FormData) return false
  if (value instanceof Blob) return false
  if (value instanceof ArrayBuffer) return false
  return true
}

function extractErrorMessage(payload: unknown): string | undefined {
  if (!payload) return undefined
  if (typeof payload === 'string') return payload
  if (typeof payload === 'object') {
    const maybeRecord = payload as Record<string, unknown>
    if (typeof maybeRecord.message === 'string') return maybeRecord.message
    if (typeof maybeRecord.error === 'string') return maybeRecord.error
  }
  return undefined
}
