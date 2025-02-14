export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/work-task/v1/login`,
  REGISTER: `${BASE_URL}/work-task/v1/register`,
  LOGOUT: `${BASE_URL}/work-task/v1/logout`,
  REFRESH: `${BASE_URL}/work-task/v1/refresh`,
  USER_INFO: `${BASE_URL}/work-task/v1/user-info`,
}; 