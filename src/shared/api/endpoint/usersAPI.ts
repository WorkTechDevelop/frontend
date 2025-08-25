import type {
  GetAllUsersData,
  GetUserData,
  GetGenderValuesData,
  UpdateUserData,
  UpdateUserRequest,
} from '../../../data-contracts'
import { API_ENDPOINT_PATH } from '../endpointPath'
import { workTechApi } from '../workTechHttpClient'
import type { RequestParams } from './type'

/**
 * @name GetAllUsers
 * @summary Получить всех пользователей
 * @request GET:/users
 */
export function getAllUsers({
  otherParams = {},
}: {
  otherParams: RequestParams
}) {
  return workTechApi<GetAllUsersData>({
    method: 'GET',
    url: API_ENDPOINT_PATH.USERS.GET_ALL(),
    ...otherParams,
  })
}

/**
 * @name GetUser
 * @summary Получить профиль текущего пользователя
 * @request GET:/users/profile
 */
export function getUserProfile({
  otherParams = {},
}: {
  otherParams: RequestParams
}) {
  return workTechApi<GetUserData>({
    method: 'GET',
    url: API_ENDPOINT_PATH.USERS.PROFILE(),
    ...otherParams,
  })
}

/**
 * @name UpdateUser
 * @summary Обновить данные пользователя
 * @request PUT:/users/update
 */
export function updateUser({
  data,
  otherParams = {},
}: {
  data: UpdateUserRequest
  otherParams: RequestParams
}) {
  return workTechApi<UpdateUserData>({
    method: 'PUT',
    url: API_ENDPOINT_PATH.USERS.UPDATE(),
    data,
    ...otherParams,
  })
}

/**
 * @name GetGenderValues
 * @summary Получить значения пола
 * @request GET:/users/gender-values
 */
export function getGenderValues({
  otherParams = {},
}: {
  otherParams: RequestParams
}) {
  return workTechApi<GetGenderValuesData>({
    method: 'GET',
    url: API_ENDPOINT_PATH.USERS.GENDER_VALUES(),
    ...otherParams,
  })
}
