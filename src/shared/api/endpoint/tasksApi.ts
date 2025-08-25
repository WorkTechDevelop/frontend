import type {
  CreateTaskData,
  UpdateTaskData,
  UpdateTaskStatusData,
  CreateCommentData,
  UpdateCommentData,
  LinkTaskData,
  GetTaskHistoryData,
  GetTasksInProjectData,
  AllTasksLinksData,
  AllTasksCommentsData,
  TaskModelDTO,
  UpdateTaskModelDTO,
  UpdateStatusRequestDTO,
  LinkDto,
  CommentDto,
  UpdateCommentDto,
  DeleteCommentData,
} from '../../../data-contracts'
import { API_ENDPOINT_PATH } from '../endpointPath'
import { workTechApi } from '../workTechHttpClient'
import type { RequestParams } from './type'

/**
 * @name CreateTask
 * @summary Создать задачу
 * @request POST:/tasks/create
 */
export function createTask({
  data,
  otherParams = {},
}: {
  data: TaskModelDTO
  otherParams: RequestParams
}) {
  return workTechApi<CreateTaskData>({
    method: 'POST',
    url: API_ENDPOINT_PATH.TASKS.CREATE(),
    data,
    ...otherParams,
  })
}

/**
 * @name UpdateTask
 * @summary Обновить задачу
 * @request PUT:/tasks/{projectId}/{taskId}/update
 */
export function updateTask({
  projectId,
  taskId,
  data,
  otherParams = {},
}: {
  projectId: string
  taskId: string
  data: UpdateTaskModelDTO
  otherParams: RequestParams
}) {
  return workTechApi<UpdateTaskData>({
    method: 'PUT',
    url: API_ENDPOINT_PATH.TASKS.UPDATE({ projectId, taskId }),
    data,
    ...otherParams,
  })
}

/**
 * @name UpdateTaskStatus
 * @summary Обновить статус задачи
 * @request PUT:/tasks/update-status
 */
export function updateTaskStatus({
  data,
  otherParams = {},
}: {
  data: UpdateStatusRequestDTO
  otherParams: RequestParams
}) {
  return workTechApi<UpdateTaskStatusData>({
    method: 'PUT',
    url: API_ENDPOINT_PATH.TASKS.UPDATE_STATUS(),
    data,
    ...otherParams,
  })
}

/**
 * @name GetTaskHistory
 * @summary Получить историю изменений задачи
 * @request GET:/tasks/{projectId}/{taskId}/history
 */
export function getTaskHistory({
  projectId,
  taskId,
  otherParams = {},
}: {
  projectId: string
  taskId: string
  otherParams: RequestParams
}) {
  return workTechApi<GetTaskHistoryData>({
    method: 'GET',
    url: API_ENDPOINT_PATH.TASKS.GET_HISTORY({ projectId, taskId }),
    ...otherParams,
  })
}

/**
 * @name GetTasksInProject
 * @summary Получить все задачи активного проекта отсортированные по пользователям
 * @request GET:/tasks/tasks-in-project
 */
export function getTasksInProject({
  otherParams = {},
}: {
  otherParams: RequestParams
}) {
  return workTechApi<GetTasksInProjectData>({
    method: 'GET',
    url: API_ENDPOINT_PATH.TASKS.GET_ALL_IN_PROJECT(),
    ...otherParams,
  })
}

/**
 * @name LinkTask
 * @summary Связать задачи
 * @request POST:/tasks/create-link
 */
export function linkTask({
  data,
  otherParams = {},
}: {
  data: LinkDto
  otherParams: RequestParams
}) {
  return workTechApi<LinkTaskData>({
    method: 'POST',
    url: API_ENDPOINT_PATH.TASKS.LINK(),
    data,
    ...otherParams,
  })
}

/**
 * @name AllTasksLinks
 * @summary Вывод всех связей задачи
 * @request GET:/tasks/{taskId}/{projectId}/links
 */
export function getAllTasksLinks({
  taskId,
  projectId,
  otherParams = {},
}: {
  taskId: string
  projectId: string
  otherParams: RequestParams
}) {
  return workTechApi<AllTasksLinksData>({
    method: 'GET',
    url: API_ENDPOINT_PATH.TASKS.GET_LINKS({ taskId, projectId }),
    ...otherParams,
  })
}

/**
 * @name CreateComment
 * @summary Создать комментарий к задаче
 * @request POST:/tasks/create-comment
 */
export function createComment({
  data,
  otherParams = {},
}: {
  data: CommentDto
  otherParams: RequestParams
}) {
  return workTechApi<CreateCommentData>({
    method: 'POST',
    url: API_ENDPOINT_PATH.TASKS.CREATE_COMMENT(),
    data,
    ...otherParams,
  })
}

/**
 * @name UpdateComment
 * @summary Обновить комментарий
 * @request PUT:/tasks/update-comment
 */
export function updateComment({
  data,
  otherParams = {},
}: {
  data: UpdateCommentDto
  otherParams: RequestParams
}) {
  return workTechApi<UpdateCommentData>({
    method: 'PUT',
    url: API_ENDPOINT_PATH.TASKS.UPDATE_COMMENT(),
    data,
    ...otherParams,
  })
}

/**
 * @name DeleteComment
 * @summary Удалить комментарий
 * @request DELETE:/tasks/{commentId}/{taskId}/{projectId}/delete-comment
 */
export function deleteComment({
  commentId,
  taskId,
  projectId,
  otherParams = {},
}: {
  commentId: string
  taskId: string
  projectId: string
  otherParams: RequestParams
}) {
  return workTechApi<DeleteCommentData>({
    method: 'DELETE',
    url: API_ENDPOINT_PATH.TASKS.DELETE_COMMENT({
      commentId,
      taskId,
      projectId,
    }),
    ...otherParams,
  })
}

/**
 * @name GetAllTasksComments
 * @summary Получить комментарии к задаче
 * @request GET:/tasks/{taskId}/{projectId}/comments
 */
export function getComments({
  taskId,
  projectId,
  otherParams = {},
}: {
  taskId: string
  projectId: string
  otherParams: RequestParams
}) {
  return workTechApi<AllTasksCommentsData>({
    method: 'GET',
    url: API_ENDPOINT_PATH.TASKS.GET_COMMENTS({ taskId, projectId }),
    ...otherParams,
  })
}
