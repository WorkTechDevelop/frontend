import type { AxiosRequestConfig } from 'axios'

export type RequestParams = Omit<
  AxiosRequestConfig,
  'url' | 'method' | 'baseUrl' | 'data'
>
