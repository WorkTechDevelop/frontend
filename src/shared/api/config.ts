export const WORKTECH_API_BASE_URL = 'http://91.211.249.37/test'
export const WORKTECH_API_VERSION = 'v1'
export const WORKTECH_API_PREFIX = 'work-task/api'

export const buildApiUrl = (endpoint: string): string => {
  return `${WORKTECH_API_BASE_URL}/${WORKTECH_API_PREFIX}/${WORKTECH_API_VERSION}${endpoint}`
}
