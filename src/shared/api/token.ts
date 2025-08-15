const LOCAL_STORAGE_KEY = {
  accessToken: 'workTechAccessToken',
  refreshToken: 'workTechRefreshToken',
}

export function getAccessToken() {
  return localStorage.getItem(LOCAL_STORAGE_KEY.accessToken)
}

export function saveAccessToken(accessToken: string) {
  localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, accessToken)
}

export function getRefreshToken() {
  return localStorage.getItem(LOCAL_STORAGE_KEY.refreshToken)
}

export function saveRefreshToken(refreshToken: string) {
  localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, refreshToken)
}

export function clearTokens() {
  localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, '')
  localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, '')
}
