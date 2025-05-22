import { API_ENDPOINTS } from '../config/api';

// Типы ошибок
export const ErrorTypes = {
  NETWORK: 'NETWORK_ERROR',
  AUTH: 'AUTH_ERROR',
  VALIDATION: 'VALIDATION_ERROR',
  SERVER: 'SERVER_ERROR',
  UNKNOWN: 'UNKNOWN_ERROR'
};

// Коды ошибок
export const ErrorCodes = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  VALIDATION: 422,
  SERVER_ERROR: 500
};

// Класс для обработки ошибок API
export class ApiError extends Error {
  constructor(type, message, code, details = null) {
    super(message);
    this.name = 'ApiError';
    this.type = type;
    this.code = code;
    this.details = details;
  }
}

// Обновление токена
async function refreshAuthToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new ApiError(ErrorTypes.AUTH, 'Нет refresh токена', ErrorCodes.UNAUTHORIZED);
  }

  const response = await fetch(API_ENDPOINTS.REFRESH, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
    credentials: 'include'
  });

  if (!response.ok) {
    throw new ApiError(ErrorTypes.AUTH, 'Не удалось обновить токен', response.status);
  }

  const data = await response.json();
  localStorage.setItem('authToken', data.accessToken);
  if (data.refreshToken) {
    localStorage.setItem('refreshToken', data.refreshToken);
  }

  return data.accessToken;
}

// Обработка ошибок авторизации
async function handleAuthError(response) {
  try {
    await refreshAuthToken();
    return null; // Токен обновлен успешно
  } catch (error) {
    // Очищаем токены и перенаправляем на логин
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
    return new ApiError(ErrorTypes.AUTH, 'Сессия истекла. Пожалуйста, войдите снова.', response.status);
  }
}

// Обработчик ошибок API
export async function handleApiError(response) {
  const status = response.status;
  let errorData;

  try {
    errorData = await response.json();
  } catch {
    errorData = { message: response.statusText };
  }

  // Обработка ошибок авторизации
  if (status === ErrorCodes.UNAUTHORIZED) {
    return handleAuthError(response);
  }

  // Определение типа ошибки
  let type = ErrorTypes.UNKNOWN;
  let message = errorData.message || 'Произошла неизвестная ошибка';
  let details = null;

  switch (status) {
    case ErrorCodes.FORBIDDEN:
      type = ErrorTypes.AUTH;
      message = 'Доступ запрещен';
      break;
    case ErrorCodes.NOT_FOUND:
      type = ErrorTypes.SERVER;
      message = 'Ресурс не найден';
      break;
    case ErrorCodes.VALIDATION:
      type = ErrorTypes.VALIDATION;
      message = 'Ошибка валидации';
      details = errorData.errors || errorData;
      break;
    case ErrorCodes.SERVER_ERROR:
      type = ErrorTypes.SERVER;
      message = 'Ошибка сервера';
      break;
    default:
      if (status >= 500) {
        type = ErrorTypes.SERVER;
        message = 'Ошибка сервера';
      } else if (status >= 400) {
        type = ErrorTypes.VALIDATION;
        message = 'Ошибка запроса';
      }
  }

  return new ApiError(type, message, status, details);
}

/**
 * Обработчик сетевых ошибок
 * @param {Error} error - Объект ошибки
 * @returns {ApiError} - Объект ошибки
 */
export function handleNetworkError(error) {
  return new ApiError(
    ErrorTypes.NETWORK,
    'Ошибка сети. Проверьте подключение к интернету.',
    null,
    error
  );
}

/**
 * Логирование ошибок
 * @param {ApiError} error - Объект ошибки
 */
export function logError(error) {
  console.error('API Error:', {
    type: error.type,
    message: error.message,
    code: error.code,
    details: error.details,
    timestamp: new Date().toISOString()
  });
} 