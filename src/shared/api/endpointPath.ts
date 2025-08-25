type ProjectId = {
  projectId: string | number
}

type TaskId = {
  taskId: string | number
}

type SprintId = {
  sprintId: string | number
}

type CommentId = {
  commentId: string | number
}

type UserId = {
  userId: string | number
}

export const API_ENDPOINT_PATH = {
  AUTH: {
    LOGIN: () => `/auth/login`,
    REFRESH_TOKEN: () => `/auth/refresh`,
    LOGOUT: () => `/auth/logout`,
    CONFIRM_EMAIL: () => `/auth/confirm-email`,
  },

  REGISTRATION: {
    REGISTER: () => `/registration/registry`,
  },

  USERS: {
    GET_ALL: () => `/users`,
    PROFILE: () => `/users/profile`,
    UPDATE: () => `/users/update`,
    GENDER_VALUES: () => `/users/gender-values`,
    GET_BY_ID: () => `/admin/{userId}/profile`,
  },

  PROJECTS: {
    CREATE: () => `/projects/create`,

    GET_ALL_USER: () => `/projects/for-user`,

    GET_ACTIVE: () => `/projects/last`,

    GET_BY_ID: ({ projectId }: ProjectId) => `/projects/${projectId}`,

    GET_FILTERED: ({ projectId }: ProjectId) =>
      `/projects/${projectId}/filtered`,

    START: ({ projectId }: ProjectId) => `/projects/${projectId}/start`,

    FINISH: ({ projectId }: ProjectId) => `/projects/${projectId}/finish`,

    ADD_USERS: ({ projectId }: ProjectId) => `/projects/${projectId}/add-users`,

    REMOVE_USERS: ({ projectId }: ProjectId) =>
      `/projects/${projectId}/delete-users`,
  },

  SPRINTS: {
    CREATE: ({ projectId }: ProjectId) =>
      `/sprints/project/${projectId}/create`,

    UPDATE: ({ projectId, sprintId }: ProjectId & SprintId) =>
      `/sprints/project/${projectId}/${sprintId}/update`,

    ACTIVATE: ({ projectId, sprintId }: ProjectId & SprintId) =>
      `/sprints/project/${projectId}/${sprintId}/activate`,

    FINISH: ({ projectId, sprintId }: ProjectId & SprintId) =>
      `/sprints/project/${projectId}/${sprintId}/finish`,

    GET_INFO: ({ projectId }: ProjectId) =>
      `/sprints/project/${projectId}/sprint-info`,
  },

  TASKS: {
    CREATE: () => `/tasks/create`,

    UPDATE: ({ projectId, taskId }: ProjectId & TaskId) =>
      `/tasks/${projectId}/${taskId}/update`,

    UPDATE_STATUS: () => `/tasks/update-status`,

    GET_HISTORY: ({ projectId, taskId }: ProjectId & TaskId) =>
      `/tasks/${projectId}/${taskId}/history`,

    GET_ALL_IN_PROJECT: () => `/tasks/tasks-in-project`,

    LINK: () => `/tasks/create-link`,

    GET_LINKS: ({ taskId }: TaskId) => `/tasks/${taskId}/{projectId}/links`,

    CREATE_COMMENT: () => `/tasks/create-comment`,

    UPDATE_COMMENT: () => `/tasks/update-comment`,

    DELETE_COMMENT: ({
      projectId,
      taskId,
      commentId,
    }: ProjectId & TaskId & CommentId) =>
      `/tasks/${commentId}/${taskId}/${projectId}/delete-comment`,

    GET_COMMENTS: ({ projectId, taskId }: ProjectId & TaskId) =>
      `/tasks/${taskId}/${projectId}/comments`,
  },

  STATUSES: {
    GET_ALL: ({ projectId }: ProjectId) => `/statuses/project/${projectId}`,

    CREATE: ({ projectId }: ProjectId) =>
      `/statuses/project/${projectId}/create`,

    UPDATE: ({ projectId }: ProjectId) =>
      `/statuses/project/${projectId}/update`,
  },

  ADMIN: {
    BLOCK_USERS: () => `/admin/block`,

    ACTIVATE_USERS: () => `/admin/activate`,

    UPDATE_ROLES: ({ userId }: UserId) => `/admin/${userId}/update-roles`,

    UPDATE_OWNER: ({ projectId, userId }: ProjectId & UserId) =>
      `/admin/${projectId}/${userId}/update-owner`,

    ADD_PERMISSION: ({ projectId, userId }: ProjectId & UserId) =>
      `/admin/${projectId}/${userId}/add-extended-permission`,

    REMOVE_PERMISSION: ({ projectId, userId }: ProjectId & UserId) =>
      `/admin/${projectId}/${userId}/delete-extended-permission`,
  },

  ROLES: {
    GET_ALL: () => `/roles`,
  },
} as const
