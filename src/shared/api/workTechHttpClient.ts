import axios from 'axios'
import { buildApiUrl } from './config'
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  saveAccessToken,
  saveRefreshToken,
} from './token'
import { API_ENDPOINTS } from './endpoint'

// TODO: нужно будет брать из перечисления типов по запросам
export interface LoginResponseDTO {
  accessToken?: string
  refreshToken?: string
}

export const workTechApi = axios.create({
  baseURL: buildApiUrl(''),
})

workTechApi.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken()
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

workTechApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      const refreshToken = getRefreshToken()

      if (!refreshToken) {
        // todo: add redirect to login page
        console.error(
          'тут должна быть обработка при отсутствии авторизации, например переход на страницу логина ',
          error,
        )
        return
      }

      originalRequest._retry = true

      try {
        const response = await axios.post<LoginResponseDTO>(
          buildApiUrl(API_ENDPOINTS.AUTH.REFRESH_TOKEN()),
          {
            refreshToken,
          },
        )
        const { data } = response

        if (!data.accessToken || !data.refreshToken) {
          clearTokens()
          throw new Error('no tokens in response on refresh')
        }

        saveAccessToken(response.data.accessToken!)
        saveRefreshToken(response.data.refreshToken!)

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken!}`
        return axios(originalRequest)
      } catch (error) {
        // todo: add redirect to login page
        console.error(
          'тут должна быть обработка при отсутствии авторизации, например переход на страницу логина ',
          error,
        )
      }
    }

    return Promise.reject(error)
  },
)

// export interface HttpClientConfig {
//   baseUrl: string
//   getAccessToken?: () => string | null | undefined
//   onUnauthorized?: () => void
//   defaultHeaders?: Record<string, string>
// }

// export type RequestOptions = Omit<RequestInit, 'body'> & {
//   body?: RequestInit['body'] | object | Array<never>
// }

// export class BaseHttpClient {
//   private readonly baseUrl: string
//   private readonly getAccessToken?: HttpClientConfig['getAccessToken']
//   private readonly onUnauthorized?: HttpClientConfig['onUnauthorized']
//   private readonly defaultHeaders: Required<HttpClientConfig['defaultHeaders']>

//   constructor(config: HttpClientConfig) {
//     this.baseUrl = config.baseUrl.replace(/\/$/, '')
//     this.getAccessToken = config.getAccessToken
//     this.onUnauthorized = config.onUnauthorized
//     this.defaultHeaders = config.defaultHeaders || {}
//   }

//   async request<T = unknown>(
//     endpoint: string,
//     options: RequestOptions = {},
//   ): Promise<T> {
//     const requestParams = this.prepareRequestParams(options)
//     const url = this.baseUrl + endpoint

//     try {
//       const response = await fetch(url, requestParams)

//       if (response.status === 401 && this.onUnauthorized) {
//         this.onUnauthorized()
//       }

//       if (!response.ok) {
//         this.handleNotOkResponse(response)
//       }

//       return await this.getResponseData<T>(response)
//     } catch (error) {
//       throw new Error(String(error))
//     }
//   }

//   private async getResponseData<T>(response: Response) {
//     const contentType = response.headers.get('content-type') || ''

//     if (contentType.includes('application/json')) {
//       return (await response.json()) as T
//     }
//     if (contentType.includes('text/')) {
//       return (await response.text()) as T
//     }
//     return (await response.blob()) as T
//   }

//   private async handleNotOkResponse(response: Response) {
//     let errorPayload: unknown = null
//     const contentType = response.headers.get('content-type') || ''

//     try {
//       if (contentType.includes('application/json')) {
//         errorPayload = await response.json()
//       } else {
//         errorPayload = await response.text()
//       }
//     } catch {
//       console.error('error ocured during parsing error message')
//     }

//     const message =
//       extractErrorMessage(errorPayload) || `HTTP ${response.status}`

//     throw new HttpError(message, response.status, errorPayload)
//   }

//   private prepareRequestParams(options: RequestOptions) {
//     const { headers, body, ...rest } = options

//     const finalHeaders = new Headers({
//       ...this.defaultHeaders,
//       ...(headers || {}),
//     })

//     const token = this.getAccessToken?.()

//     if (token) {
//       finalHeaders.set('Authorization', `Bearer ${token}`)
//     }

//     if (isJsonLike(body) && !finalHeaders.has('Content-Type')) {
//       finalHeaders.set('Content-Type', 'application/json')
//     }

//     const requestParams: RequestInit = {
//       ...rest,
//       headers: finalHeaders,
//       body: isJsonLike(body)
//         ? JSON.stringify(body)
//         : (body as BodyInit | null | undefined),
//     }

//     return requestParams
//   }
// }

// export class HttpError<T = unknown> extends Error {
//   public readonly status: number
//   public readonly data: T | null

//   constructor(message: string, status: number, data: T | null = null) {
//     super(message)
//     this.name = 'HttpError'
//     this.status = status
//     this.data = data
//   }
// }

// function isJsonLike(value: unknown): boolean {
//   if (typeof value !== 'object') return false
//   if (value instanceof FormData) return false
//   if (value instanceof Blob) return false
//   if (value instanceof ArrayBuffer) return false
//   return true
// }

// function extractErrorMessage(payload: unknown): string | undefined {
//   if (!payload) return undefined
//   if (typeof payload === 'string') return payload
//   if (typeof payload === 'object') {
//     const maybeRecord = payload as Record<string, unknown>
//     if (typeof maybeRecord.message === 'string') return maybeRecord.message
//     if (typeof maybeRecord.error === 'string') return maybeRecord.error
//   }
//   return undefined
// }
