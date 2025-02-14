export const API_URL = process.env.REACT_APP_API_URL || 'http://91.211.249.37:31055';
export const BASE_URL = process.env.REACT_APP_BASE_URL || '/work-task/v1';

export const API_ENDPOINTS = {
  LOGIN: `${API_URL}${BASE_URL}/login`,
  REGISTER: `${BASE_URL}/work-task/v1/register`,
  LOGOUT: `${BASE_URL}/work-task/v1/logout`,
  REFRESH: `${BASE_URL}/work-task/v1/refresh`,
  USER_INFO: `${BASE_URL}/work-task/v1/user-info`,
}; 