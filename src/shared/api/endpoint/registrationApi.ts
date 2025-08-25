import type { RegisterDTO, RegisterUserData } from '../../../data-contracts'
import { API_ENDPOINT_PATH } from '../endpointPath'
import { workTechApiClient } from '../workTechHttpClient'
import type { RequestParams } from './type'

/**
 * @name RegisterUser
 * @summary Регистрация нового пользователя
 * @request POST:/registration/registry
 */
export function registerUser({
  data,
  otherParams = {},
}: {
  data: RegisterDTO
  otherParams: RequestParams
}) {
  return workTechApiClient<RegisterUserData>({
    method: 'POST',
    url: API_ENDPOINT_PATH.REGISTRATION.REGISTER(),
    data,
    ...otherParams,
  })
}
