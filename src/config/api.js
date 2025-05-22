import { handleApiError, logError } from '../utils/errorHandler';

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

// Получение заголовков для запроса
function getRequestHeaders(options = {}) {
    const token = localStorage.getItem('authToken');
    const csrfToken = localStorage.getItem('csrfToken');

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    if (csrfToken) {
        headers['X-CSRF-Token'] = csrfToken;
    }

    return headers;
}

// Выполнение запроса с обработкой ошибок
async function makeRequest(url, options) {
    const response = await fetch(url, {
        ...options,
        headers: getRequestHeaders(options),
        credentials: 'include'
    });

    if (!response.ok) {
        const error = await handleApiError(response);
        if (error) {
            logError(error);
            throw error;
        }
        // Если handleApiError вернул null, значит токен был обновлен
        // Повторяем запрос с новым токеном
        return fetch(url, {
            ...options,
            headers: getRequestHeaders(options),
            credentials: 'include'
        });
    }

    return response;
}

// Универсальный fetch с поддержкой refresh токена и обработкой ошибок
export const authFetch = (url, options = {}) => makeRequest(url, options);