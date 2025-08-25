import type {
  CreateStatusData,
  GetStatusesData,
  UpdateStatusesData,
  CreateTaskStatusDto,
  UpdateRequestStatusesDto,
} from '../../../data-contracts'
import { API_ENDPOINT_PATH } from '../endpointPath'
import { workTechApiClient } from '../workTechHttpClient'
import type { RequestParams } from './type'

/**
 * @name GetStatuses
 * @summary Получить статусы проекта
 * @request GET:/statuses/project/{projectId}
 */
export function getStatuses({
  projectId,
  otherParams = {},
}: {
  projectId: string
  otherParams: RequestParams
}) {
  return workTechApiClient<GetStatusesData>({
    method: 'GET',
    url: API_ENDPOINT_PATH.STATUSES.GET_ALL({ projectId }),
    ...otherParams,
  })
}

/**
 * @name CreateStatus
 * @summary Создать статус в проекте
 * @request POST:/statuses/project/{projectId}/create
 */
export function createStatus({
  projectId,
  data,
  otherParams = {},
}: {
  projectId: string
  data: CreateTaskStatusDto
  otherParams: RequestParams
}) {
  return workTechApiClient<CreateStatusData>({
    method: 'POST',
    url: API_ENDPOINT_PATH.STATUSES.CREATE({ projectId }),
    data,
    ...otherParams,
  })
}

/**
 * @name UpdateStatuses
 * @summary Обновить статусы проекта
 * @request PUT:/statuses/project/{projectId}/update
 */
export function updateStatuses({
  projectId,
  data,
  otherParams = {},
}: {
  projectId: string
  data: UpdateRequestStatusesDto
  otherParams: RequestParams
}) {
  return workTechApiClient<UpdateStatusesData>({
    method: 'PUT',
    url: API_ENDPOINT_PATH.STATUSES.UPDATE({ projectId }),
    data,
    ...otherParams,
  })
}
