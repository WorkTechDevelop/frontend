import { handleApiError, handleNetworkError, logError } from '../utils/errorHandler';
import { addCSRFTokenToHeaders } from '../utils/csrf';

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
  UPDATE_TASK_STATUS: `${API_URL}${BASE_URL}/task/update-status`, //TODO: Чтобы при перемещении задачи в рамках одного статуса - статус не менялся
  GET_PROJECT_TASKS: (projectId) => `${API_URL}${BASE_URL}/task/project-tasks/${projectId}`,
  GET_TASK_BY_CODE: (code) => `${API_URL}${BASE_URL}/task/${code}`,
  GET_USER_BY_ID: (id) => `${API_URL}${BASE_URL}/user/${id}`,
};

// Универсальный fetch с поддержкой refresh токена, CSRF-защитой и обработкой ошибок
export const authFetch = async (url, options = {}) => {
    const token = localStorage.getItem('authToken');
    const csrfToken = localStorage.getItem('csrfToken');

    const defaultHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-CSRF-Token'
    };

    if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    if (csrfToken) {
        defaultHeaders['X-CSRF-Token'] = csrfToken;
    }

    const response = await fetch(url, {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
        credentials: 'include',
        mode: 'cors'
    });

    if (!response.ok) {
        const error = await handleApiError(response);
        if (error) {
            logError(error);
            throw error;
        }
        // Если handleApiError вернул null, значит токен был обновлен
        // Повторяем запрос с новым токеном
        const newToken = localStorage.getItem('authToken');
        if (newToken) {
            defaultHeaders['Authorization'] = `Bearer ${newToken}`;
        }
        const retryResponse = await fetch(url, {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers,
            },
            credentials: 'include',
            mode: 'cors'
        });
        if (!retryResponse.ok) {
            const retryError = await handleApiError(retryResponse);
            if (retryError) {
                logError(retryError);
                throw retryError;
            }
        }
        return retryResponse;
    }

    return response;
};