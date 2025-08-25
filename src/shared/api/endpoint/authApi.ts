import type {
  AuthenticateUserData,
  ConfirmEmailData,
  ConfirmEmailParams,
  LoginRequestDTO,
  LogoutData,
  RefreshTokenData,
  TokenRefreshRequestDTO,
} from '../../../data-contracts'
import { API_ENDPOINT_PATH } from '../endpointPath'
import { workTechApiClient } from '../workTechHttpClient'
import type { RequestParams } from './type'

/**
 * @name AuthenticateUser
 * @summary Войти в учетную запись
 * @request POST:/auth/login
 */
export function authenticateUser({
  data,
  otherParams = {},
}: {
  data: LoginRequestDTO
  otherParams: RequestParams
}) {
  return workTechApiClient<AuthenticateUserData>({
    method: 'POST',
    url: API_ENDPOINT_PATH.AUTH.LOGIN(),
    data,
    ...otherParams,
  })
}

/**
 * @name RefreshToken
 * @summary Обновить accessToken клиента
 * @request POST:/auth/refresh
 */
export function refreshToken({
  data,
  otherParams = {},
}: {
  data: TokenRefreshRequestDTO
  otherParams: RequestParams
}) {
  return workTechApiClient<RefreshTokenData>({
    method: 'POST',
    url: API_ENDPOINT_PATH.AUTH.REFRESH_TOKEN(),
    data,
    ...otherParams,
  })
}

/**
 * @name Logout
 * @summary Выход из системы
 * @request POST:/auth/logout
 */
export function logout({ otherParams = {} }: { otherParams: RequestParams }) {
  return workTechApiClient<LogoutData>({
    method: 'POST',
    url: API_ENDPOINT_PATH.AUTH.LOGOUT(),
    ...otherParams,
  })
}

/**
 * @name ConfirmEmail
 * @summary Подтверждение почты пользователем
 * @request GET:/auth/confirm-email
 */
export function confirmEmail({
  query,
  otherParams = {},
}: {
  query: ConfirmEmailParams
  otherParams: RequestParams
}) {
  return workTechApiClient<ConfirmEmailData>({
    method: 'GET',
    url: API_ENDPOINT_PATH.AUTH.CONFIRM_EMAIL(),
    params: query,
    ...otherParams,
  })
}
