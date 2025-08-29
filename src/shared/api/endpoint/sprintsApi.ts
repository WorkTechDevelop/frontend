import type {
  ActivateSprintData,
  CreateSprintData,
  FinishSprintData,
  GetSprintInfoData,
  SprintDtoRequest,
  UpdateSprintData,
} from '../../../data-contracts'
import { API_ENDPOINT_PATH } from '../endpointPath'
import { workTechApiClient } from '../workTechHttpClient'
import type { RequestParams } from './type'

/**
 * @name CreateSprint
 * @summary Создать спринт в проекте
 * @request POST:/sprints/project/{projectId}/create
 */
export function createSprint({
  projectId,
  data,
  otherParams = {},
}: {
  projectId: string
  data: SprintDtoRequest
  otherParams?: RequestParams
}) {
  return workTechApiClient<CreateSprintData>({
    method: 'POST',
    url: API_ENDPOINT_PATH.SPRINTS.CREATE({ projectId }),
    data,
    ...otherParams,
  })
}

/**
 * @name UpdateSprint
 * @summary Обновить спринт
 * @request PUT:/sprints/project/{projectId}/{sprintId}/update
 */
export function updateSprint({
  projectId,
  sprintId,
  data,
  otherParams = {},
}: {
  projectId: string
  sprintId: string
  data: SprintDtoRequest
  otherParams?: RequestParams
}) {
  return workTechApiClient<UpdateSprintData>({
    method: 'PUT',
    url: API_ENDPOINT_PATH.SPRINTS.UPDATE({ projectId, sprintId }),
    data,
    ...otherParams,
  })
}

/**
 * @name ActivateSprint
 * @summary Активировать спринт
 * @request PUT:/sprints/project/{projectId}/{sprintId}/activate
 */
export function activateSprint({
  projectId,
  sprintId,
  otherParams = {},
}: {
  projectId: string
  sprintId: string
  otherParams?: RequestParams
}) {
  return workTechApiClient<ActivateSprintData>({
    method: 'PUT',
    url: API_ENDPOINT_PATH.SPRINTS.ACTIVATE({ projectId, sprintId }),
    ...otherParams,
  })
}

/**
 * @name FinishSprint
 * @summary Завершить спринт
 * @request PUT:/sprints/project/{projectId}/{sprintId}/finish
 */
export function finishSprint({
  projectId,
  sprintId,
  otherParams = {},
}: {
  projectId: string
  sprintId: string
  otherParams?: RequestParams
}) {
  return workTechApiClient<FinishSprintData>({
    method: 'PUT',
    url: API_ENDPOINT_PATH.SPRINTS.FINISH({ projectId, sprintId }),
    ...otherParams,
  })
}

/**
 * @name GetSprintInfo
 * @summary Получить информацию по спринту (текущему/активному)
 * @request GET:/sprints/project/{projectId}/sprint-info
 */
export function getSprintInfo({
  projectId,
  otherParams = {},
}: {
  projectId: string
  otherParams?: RequestParams
}) {
  return workTechApiClient<GetSprintInfoData>({
    method: 'GET',
    url: API_ENDPOINT_PATH.SPRINTS.GET_INFO({ projectId }),
    ...otherParams,
  })
}
