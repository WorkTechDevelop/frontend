export const API_URL = process.env.REACT_APP_API_URL || 'http://91.211.249.37/prod';
export const BASE_URL = process.env.REACT_APP_BASE_URL || '/work-task/v1';

export const API_ENDPOINTS = {
  LOGIN: `${API_URL}${BASE_URL}/login`,
  REGISTER: `${API_URL}/register`,
  LOGOUT: `${API_URL}/logout`,
  REFRESH: `${API_URL}/refresh`,
  USER_INFO: `${API_URL}${BASE_URL}/user-info`,
  CREATE_TASK: `${API_URL}${BASE_URL}/task/createTask`,
  UPDATE_TASK: `${API_URL}${BASE_URL}/task/update-task`,
  UPDATE_TASK_STATUS: `${API_URL}${BASE_URL}/task/update-status`,
  GET_PROJECT_TASKS: `${API_URL}${BASE_URL}/task/project-tasks/project-id-456`,
};