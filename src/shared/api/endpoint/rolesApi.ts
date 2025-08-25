import type { GetRolesData } from '../../../data-contracts'
import { API_ENDPOINT_PATH } from '../endpointPath'
import { workTechApiClient } from '../workTechHttpClient'
import type { RequestParams } from './type'

/**
 * @name GetRoles
 * @summary Получить список ролей
 * @request GET:/roles
 */
export function getRoles({ otherParams = {} }: { otherParams: RequestParams }) {
  return workTechApiClient<GetRolesData>({
    method: 'GET',
    url: API_ENDPOINT_PATH.ROLES.GET_ALL(),
    ...otherParams,
  })
}
