export const API_URL = process.env.REACT_APP_API_URL || 'http://91.211.249.37/prod';
export const BASE_URL = process.env.REACT_APP_BASE_URL || '/work-task/v1';

export const API_ENDPOINTS = {
  LOGIN: `${API_URL}${BASE_URL}/login`,
  REGISTER: `${API_URL}${BASE_URL}/registry`,
  LOGOUT: `${API_URL}${BASE_URL}/logout`,
  REFRESH: `${API_URL}${BASE_URL}/refresh`,
  USER_INFO: `${API_URL}${BASE_URL}/user-info`,
  GET_USERS_PROJECTS: `${API_URL}${BASE_URL}/projects/users-projects`,
  CREATE_TASK: `${API_URL}${BASE_URL}/task/createTask`,
  UPDATE_TASK: `${API_URL}${BASE_URL}/task/update-task`,
  UPDATE_TASK_STATUS: `${API_URL}${BASE_URL}/task/update-status`,
  GET_PROJECT_TASKS: (projectId) => `${API_URL}${BASE_URL}/task/project-tasks/${projectId}`,
  GET_TASK_BY_CODE: (code) => `${API_URL}${BASE_URL}/task/${code}`,
  GET_USER_BY_ID: (id) => `${API_URL}${BASE_URL}/user/${id}`,
};

// Универсальный fetch с поддержкой refresh токена
export async function authFetch(url, options = {}, retry = true) {
  let token = localStorage.getItem('authToken');
  let headers = { ...options.headers, Authorization: `Bearer ${token}` };
  let response = await fetch(url, { ...options, headers });

  if (response.status === 401 && retry) {
    try {
      // Пробуем обновить токен
      const refreshToken = localStorage.getItem('refreshToken');
      const refreshResponse = await fetch(API_ENDPOINTS.REFRESH, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
        credentials: 'include'
      });
      if (!refreshResponse.ok) throw new Error('Refresh failed');
      const data = await refreshResponse.json();
      localStorage.setItem('authToken', data.accessToken);
      token = data.accessToken;
      headers = { ...options.headers, Authorization: `Bearer ${token}` };
      response = await fetch(url, { ...options, headers });
    } catch {
      // refresh не удался — разлогинить пользователя
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
      throw new Error('Session expired');
    }
  }
  return response;
}