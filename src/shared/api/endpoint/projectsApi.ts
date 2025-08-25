import type {
  AddProjectForUsersData,
  CreateProjectData,
  DeleteProjectForUsersData,
  EditProjectRequestDto,
  FinishProjectData,
  GetActiveProjectData,
  GetAllUserProjectsData,
  GetProjectDataByFilterData,
  GetProjectDataData,
  ProjectDataFilterDto,
  ProjectRequestDto,
  StartProjectData,
  StringIdsDto,
  UpdateProjectData,
} from '../../../data-contracts'
import { API_ENDPOINT_PATH } from '../endpointPath'
import { workTechApi } from '../workTechHttpClient'
import type { RequestParams } from './type'

/**
 * @name CreateProject
 * @summary Создание проекта
 * @request POST:/projects/create
 */
export function createProject({
  data,
  otherParams = {},
}: {
  data: ProjectRequestDto
  otherParams: RequestParams
}) {
  return workTechApi<CreateProjectData>({
    method: 'POST',
    url: API_ENDPOINT_PATH.PROJECTS.CREATE(),
    data,
    ...otherParams,
  })
}

/**
 * @name GetAllUserProjects
 * @summary Вывести список проектов пользователя
 * @request GET:/projects/for-user
 */
export function getAllUserProjects({
  otherParams = {},
}: {
  otherParams: RequestParams
}) {
  return workTechApi<GetAllUserProjectsData>({
    method: 'GET',
    url: API_ENDPOINT_PATH.PROJECTS.GET_ALL_USER(),
    ...otherParams,
  })
}

/**
 * @name GetActiveProject
 * @summary Получить ID основного проекта пользователя
 * @request GET:/projects/last
 */
export function getActiveProject({
  otherParams = {},
}: {
  otherParams: RequestParams
}) {
  return workTechApi<GetActiveProjectData>({
    method: 'GET',
    url: API_ENDPOINT_PATH.PROJECTS.GET_ACTIVE(),
    ...otherParams,
  })
}

/**
 * @name GetProjectData
 * @summary Получение данных проекта по ИД
 * @request GET:/projects/{projectId}
 */
export function getProjectData({
  projectId,
  otherParams = {},
}: {
  projectId: string
  otherParams: RequestParams
}) {
  return workTechApi<GetProjectDataData>({
    method: 'GET',
    url: API_ENDPOINT_PATH.PROJECTS.GET_BY_ID({ projectId }),
    ...otherParams,
  })
}

/**
 * @name GetProjectDataByFilter
 * @summary Получение данных проекта по ИД и фильтру
 * @request POST:/projects/{projectId}/filtered
 */
export function getProjectDataByFilter({
  projectId,
  data,
  otherParams = {},
}: {
  projectId: string
  data: ProjectDataFilterDto
  otherParams: RequestParams
}) {
  return workTechApi<GetProjectDataByFilterData>({
    method: 'POST',
    url: API_ENDPOINT_PATH.PROJECTS.GET_FILTERED({ projectId }),
    data,
    ...otherParams,
  })
}

/**
 * @name StartProject
 * @summary Запуск проекта по ИД
 * @request PUT:/projects/{projectId}/start
 */
export function startProject({
  projectId,
  otherParams = {},
}: {
  projectId: string
  otherParams: RequestParams
}) {
  return workTechApi<StartProjectData>({
    method: 'PUT',
    url: API_ENDPOINT_PATH.PROJECTS.START({ projectId }),
    ...otherParams,
  })
}

/**
 * @name FinishProject
 * @summary Завершение проекта по ИД
 * @request PUT:/projects/{projectId}/finish
 */
export function finishProject({
  projectId,
  otherParams = {},
}: {
  projectId: string
  otherParams: RequestParams
}) {
  return workTechApi<FinishProjectData>({
    method: 'PUT',
    url: API_ENDPOINT_PATH.PROJECTS.FINISH({ projectId }),
    ...otherParams,
  })
}

/**
 * @name AddProjectForUsers
 * @summary Добавление проекта пользователям
 * @request PUT:/projects/{projectId}/add-users
 */
export function addProjectForUsers({
  projectId,
  data,
  otherParams = {},
}: {
  projectId: string
  data: StringIdsDto
  otherParams: RequestParams
}) {
  return workTechApi<AddProjectForUsersData>({
    method: 'PUT',
    url: API_ENDPOINT_PATH.PROJECTS.ADD_USERS({ projectId }),
    data,
    ...otherParams,
  })
}

/**
 * @name DeleteProjectForUsers
 * @summary Удаление пользователей из проекта
 * @request DELETE:/projects/{projectId}/delete-users
 */
export function deleteProjectForUsers({
  projectId,
  data,
  otherParams = {},
}: {
  projectId: string
  data: StringIdsDto
  otherParams: RequestParams
}) {
  return workTechApi<DeleteProjectForUsersData>({
    method: 'DELETE',
    url: API_ENDPOINT_PATH.PROJECTS.REMOVE_USERS({ projectId }),
    data,
    ...otherParams,
  })
}

/**
 * @name UpdateProject
 * @summary Редактирование проекта
 * @request PUT:/projects/{projectId}/edit
 */
export function updateProject({
  projectId,
  data,
  otherParams = {},
}: {
  projectId: string
  data: EditProjectRequestDto
  otherParams: RequestParams
}) {
  return workTechApi<UpdateProjectData>({
    method: 'PUT',
    url: API_ENDPOINT_PATH.PROJECTS.UPDATE_PROJECT({ projectId }),
    data,
    ...otherParams,
  })
}
