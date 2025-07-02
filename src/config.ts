// WorkTask API Configuration
export const WORKTECH_API_BASE_URL = process.env.NEXT_PUBLIC_WORKTECH_API_URL || 'http://91.211.249.37/test';
export const WORKTECH_API_VERSION = 'v1';
export const WORKTECH_API_PREFIX = 'work-task/api';

export const API_ENDPOINTS = {

  AUTH: {
    LOGIN: '/auth/login',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    CONFIRM_EMAIL: '/auth/confirm-email',
  },

  REGISTRATION: {
    REGISTER: '/registration/registry',
  },

  USERS: {
    BASE: '/users',
    PROFILE: '/users/profile',
    UPDATE: '/users/update',
    GENDER_VALUES: '/users/gender-values',
  },

  PROJECTS: {
    BASE: '/projects',
    CREATE: '/projects/create',
    ALL_USER_PROJECTS: '/projects/for-user',
    ACTIVE_PROJECT: '/projects/last',
    GET_BY_ID: '/projects/{projectId}',
    FILTERED: '/projects/{projectId}/filtered',
    START: '/projects/{projectId}/start',
    FINISH: '/projects/{projectId}/finish',
    ADD_USERS: '/projects/{projectId}/add-users',
    DELETE_USERS: '/projects/{projectId}/delete-users',
  },

  SPRINTS: {
    CREATE: '/sprints/project/{projectId}/create',
    UPDATE: '/sprints/project/{projectId}/{sprintId}/update',
    ACTIVATE: '/sprints/project/{projectId}/{sprintId}/activate',
    FINISH: '/sprints/project/{projectId}/{sprintId}/finish',
    INFO: '/sprints/project/{projectId}/sprint-info',
  },

  TASKS: {
    CREATE: '/tasks/create',
    UPDATE: '/tasks/update',
    UPDATE_STATUS: '/tasks/update-status',
    HISTORY: '/tasks/{projectId}/{taskId}/history',
    TASKS_IN_PROJECT: '/tasks/tasks-in-project',
    LINK_TASK: '/tasks/create-link',
    ALL_LINKS: '/tasks/{taskId}/{projectId}/links',
    CREATE_COMMENT: '/tasks/create-comment',
    UPDATE_COMMENT: '/tasks/update-comment',
    DELETE_COMMENT: '/tasks/{commentId}/{taskId}/{projectId}/delete-comment',
    ALL_COMMENTS: '/tasks/{taskId}/{projectId}/comments',
  },

  STATUS: {
    LIST: '/statuses/project/{projectId}',
    CREATE: '/statuses/project/{projectId}/create',
    UPDATE: '/statuses/project/{projectId}/update',
  },

  ADMIN: {
    BLOCK_USERS: '/admin/block',
    ACTIVATE_USERS: '/admin/activate',
    UPDATE_ROLES: '/admin/{userId}/update-roles',
    UPDATE_OWNER: '/admin/{projectId}/{userId}/update-owner',
    ADD_EXTENDED_PERMISSION: '/admin/{projectId}/{userId}/add-extended-permission',
    DELETE_EXTENDED_PERMISSION: '/admin/{projectId}/{userId}/delete-extended-permission',
    GET_USER_PROFILE: '/admin/{userId}/profile',
  },

  ROLES: {
    LIST: '/roles',
  },
} as const;

export const buildApiUrl = (endpoint: string, params?: Record<string, string>): string => {
  let url = `${WORKTECH_API_BASE_URL}/${WORKTECH_API_PREFIX}/${WORKTECH_API_VERSION}${endpoint}`;
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`{${key}}`, value);
    });
  }
  
  return url;
};
