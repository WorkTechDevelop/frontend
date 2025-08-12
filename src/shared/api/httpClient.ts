import { BaseHttpClient } from './baseHttpClient'
import {
  WORKTECH_API_BASE_URL,
  WORKTECH_API_PREFIX,
  WORKTECH_API_VERSION,
} from './config'

export class HttpClient extends BaseHttpClient {
  get<T = unknown>(
    endpoint: string,
    options?: Omit<RequestInit, 'body' | 'method'>,
  ) {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  }

  post<T = unknown>(
    endpoint: string,
    body?: RequestInit['body'],
    options?: Omit<RequestInit, 'body' | 'method'>,
  ) {
    return this.request<T>(endpoint, { ...options, method: 'POST', body })
  }

  put<T = unknown>(
    endpoint: string,
    body?: RequestInit['body'],
    options?: Omit<RequestInit, 'body' | 'method'>,
  ) {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body })
  }

  patch<T = unknown>(
    endpoint: string,
    body?: RequestInit['body'],
    options?: Omit<RequestInit, 'body' | 'method'>,
  ) {
    return this.request<T>(endpoint, { ...options, method: 'PATCH', body })
  }

  delete<T = unknown>(
    endpoint: string,
    options?: Omit<RequestInit, 'body' | 'method'>,
  ) {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  }
}

export const workTechHttpClient = new HttpClient({
  baseUrl: `${WORKTECH_API_BASE_URL}/${WORKTECH_API_PREFIX}/${WORKTECH_API_VERSION}`,
  getAccessToken: () => window.localStorage.getItem('access_token'),
  onUnauthorized: () => {
    window.localStorage.removeItem('access_token')
    window.localStorage.removeItem('refresh_token')
  },
  defaultHeaders: {
    Accept: 'application/json',
  },
})
