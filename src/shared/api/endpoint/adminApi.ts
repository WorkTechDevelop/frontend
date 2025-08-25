import type {
  ActivateUsersData,
  AddExtendedPermissionsForUserProjectData,
  BlockUsersData,
  DeleteExtendedPermissionsForUserProjectData,
  GetUser1Data,
  StringIdsDto,
  UpdateProjectOwnerData,
  UpdateUserRolesData,
} from '../../../data-contracts'
import { API_ENDPOINT_PATH } from '../endpointPath'
import { workTechApiClient } from '../workTechHttpClient'
import type { RequestParams } from './type'

/**
 * @name UpdateUserRoles
 * @summary Обновление ролей пользователя
 * @request PUT: /admin/{userId}/update-roles
 */

export function updateUserRoles({
  userId,
  data,
  otherParams = {},
}: {
  projectId: string
  userId: string
  data: StringIdsDto
  otherParams?: RequestParams
}) {
  return workTechApiClient<UpdateUserRolesData>({
    method: 'PUT',
    url: API_ENDPOINT_PATH.ADMIN.UPDATE_ROLES({ userId }),
    data,
    ...otherParams,
  })
}

/**
 * @name UpdateProjectOwner
 * @summary Добавление руководителя проекта
 * @request PUT:/admin/{projectId}/{userId}/update-owner
 */

export function updateProjectOwner({
  userId,
  projectId,
  otherParams = {},
}: {
  userId: string
  projectId: string
  otherParams?: RequestParams
}) {
  return workTechApiClient<UpdateProjectOwnerData>({
    method: 'PUT',
    url: API_ENDPOINT_PATH.ADMIN.UPDATE_OWNER({ userId, projectId }),
    ...otherParams,
  })
}

/**
//  * @name DeleteExtendedPermissionsForUserProject
//  * @summary Удаление расширенных прав
//  * @request PUT:/admin/{projectId}/{userId}/delete-extended-permission
//  */

export function deleteExtendedPermissionsForUserProject({
  userId,
  projectId,
  otherParams = {},
}: {
  projectId: string
  userId: string
  otherParams?: RequestParams
}) {
  return workTechApiClient<DeleteExtendedPermissionsForUserProjectData>({
    method: 'PUT',
    url: API_ENDPOINT_PATH.ADMIN.REMOVE_PERMISSION({ userId, projectId }),
    ...otherParams,
  })
}

/**
//  * @name AddExtendedPermissionsForUserProject
//  * @summary Добавление расширенных прав
//  * @request PUT:/admin/{projectId}/{userId}/add-extended-permission
//  */

export function addExtendedPermissionsForUserProject({
  userId,
  projectId,
  otherParams = {},
}: {
  projectId: string
  userId: string
  otherParams?: RequestParams
}) {
  return workTechApiClient<AddExtendedPermissionsForUserProjectData>({
    method: 'PUT',
    url: API_ENDPOINT_PATH.ADMIN.ADD_PERMISSION({ userId, projectId }),
    ...otherParams,
  })
}

/**
//  * @name BlockUsers
//  * @summary Заблокировать пользователей по существующим ИД
//  * @request PUT:/admin/block
//  */

export function blockUsers({
  data,
  otherParams = {},
}: {
  data: StringIdsDto
  otherParams?: RequestParams
}) {
  return workTechApiClient<BlockUsersData>({
    method: 'PUT',
    url: API_ENDPOINT_PATH.ADMIN.BLOCK_USERS(),
    data,
    ...otherParams,
  })
}

/**
//  * @name ActivateUsers
//  * @summary Активировать пользователей по существующим ИД
//  * @request PUT:/admin/activate
//  */

export function activateUsers({
  data,
  otherParams = {},
}: {
  data: StringIdsDto
  otherParams?: RequestParams
}) {
  return workTechApiClient<ActivateUsersData>({
    method: 'PUT',
    url: API_ENDPOINT_PATH.ADMIN.ACTIVATE_USERS(),
    data,
    ...otherParams,
  })
}

/**
//  * @name GetUser1
//  * @summary Получить полные данные пользователя
//  * @request GET:/admin/{userId}/profile
//  */

export function getUserFullInfo({
  userId,
  otherParams = {},
}: {
  userId: string
  otherParams?: RequestParams
}) {
  return workTechApiClient<GetUser1Data>({
    method: 'GET',
    url: API_ENDPOINT_PATH.ADMIN.GET_USER({ userId }),
    ...otherParams,
  })
}
