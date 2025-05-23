import { API_ENDPOINTS, authFetch as originalAuthFetch } from '../config/api';
import { setAuthToken, removeAuthToken /* removeCsrfToken */ } from './auth';

// Типы ошибок
const ErrorTypes = {
  NETWORK: 'NETWORK_ERROR',
  AUTH: 'AUTH_ERROR',
  VALIDATION: 'VALIDATION_ERROR',
  SERVER: 'SERVER_ERROR',
  UNKNOWN: 'UNKNOWN_ERROR'
};

// Коды ошибок
const ErrorCodes = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  VALIDATION: 422,
  SERVER_ERROR: 500
};

// Класс для обработки ошибок API
class ApiError extends Error {
  constructor(type, message, code, details = null) {
    super(message);
    this.name = 'ApiError';
    this.type = type;
    this.code = code;
    this.details = details;
  }
}

// Централизованный обработчик ошибок API
export const handleApiError = async (response) => {
    console.log('handleApiError: Received API response with status:', response.status);

    // Не разлогинаем при 401 на /user/:id
    if (response.status === ErrorCodes.UNAUTHORIZED) {
        const url = response.url || (response.config && response.config.url) || '';
        if (url.includes('/user/')) {
            // Просто возвращаем ошибку, не разлогинаем
            const errorText = await response.text();
            return new ApiError(ErrorTypes.AUTH, `Ошибка авторизации: ${response.status} - ${errorText}`, response.status);
        }
        // --- стандартная логика разлогина ---
        console.log('handleApiError: Received 401 Unauthorized status.');
        const refreshToken = getRefreshToken();

        if (!refreshToken) {
            console.log('handleApiError: No refresh token found. Logging out user.');
            removeAuthToken();
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('csrfToken');
            window.location.href = '/login';
            const errorText = await response.text();
            return new ApiError(ErrorTypes.AUTH, `Ошибка авторизации: ${response.status} - ${errorText}`, response.status);
        }

        console.log('handleApiError: Refresh token found. Attempting to refresh token...');
        try {
            const refreshResponse = await originalAuthFetch(API_ENDPOINTS.REFRESH, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken }),
            });

            console.log('handleApiError: Token refresh response status:', refreshResponse.status);
            
            if (!refreshResponse.ok) {
                console.error('handleApiError: Token refresh failed with status:', refreshResponse.status);
                removeAuthToken();
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('csrfToken');
                window.location.href = '/login';
                const errorText = await refreshResponse.text();
                return new ApiError(ErrorTypes.AUTH, `Ошибка обновления токена: ${refreshResponse.status} - ${errorText}`, refreshResponse.status);
            }

            const data = await refreshResponse.json();
            console.log('handleApiError: Token refresh successful. Setting new tokens.');
            
            if (!data.accessToken) {
                console.error('handleApiError: No access token in refresh response');
                removeAuthToken();
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('csrfToken');
                window.location.href = '/login';
                return new ApiError(ErrorTypes.AUTH, 'Ошибка обновления токена: отсутствует access token', refreshResponse.status);
            }

            setAuthToken(data.accessToken);
            if (data.refreshToken) {
                localStorage.setItem('refreshToken', data.refreshToken);
            }
            if (data.csrfToken) {
                localStorage.setItem('csrfToken', data.csrfToken);
            }

            return null;
        } catch (refreshError) {
            console.error('handleApiError: Exception during token refresh:', refreshError);
            removeAuthToken();
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('csrfToken');
            window.location.href = '/login';
            return new ApiError(ErrorTypes.NETWORK, `Сетевая ошибка при обновлении токена: ${refreshError.message}`, null, refreshError);
        }
    } else if (response.status === ErrorCodes.FORBIDDEN) {
        console.error('handleApiError: Received 403 Forbidden status.');
        const errorText = await response.text();
        return new ApiError(ErrorTypes.AUTH, `Доступ запрещен: ${response.status} - ${errorText}`, response.status);
    } else {
        console.error('handleApiError: Received other error status:', response.status);
        const errorText = await response.text();
        return new ApiError(ErrorTypes.UNKNOWN, `Ошибка API: ${response.status} - ${errorText}`, response.status);
    }
};

/**
 * Обработчик сетевых ошибок
 * @param {Error} error - Объект ошибки
 * @returns {ApiError} - Объект ошибки
 */
export function handleNetworkError(error) {
  console.error('handleNetworkError: Received network error:', error);
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
  console.error('Application Error:', error);
  // Здесь можно добавить отправку ошибок на сервер логирования
}

// Вспомогательная функция для получения access токена
export const getAuthToken = () => localStorage.getItem('authToken');

// Вспомогательная функция для получения refresh токена
export const getRefreshToken = () => localStorage.getItem('refreshToken'); 