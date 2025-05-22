// Constants for localStorage keys
export const AUTH_TOKEN_KEY = 'authToken';
export const USER_LAST_NAME_KEY = 'lastName';
export const USER_FIRST_NAME_KEY = 'firstName';
export const USER_MIDDLE_NAME_KEY = 'middleName';

export const setAuthToken = (token) => {
  if (token) {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
  } else {
      localStorage.removeItem(AUTH_TOKEN_KEY);
  }
};

export const getAuthToken = () => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const removeAuthToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

// Функция для отладки токенов
export const debugTokens = () => {
  const tokens = {
    authToken: localStorage.getItem(AUTH_TOKEN_KEY),
    refreshToken: localStorage.getItem('refreshToken')
  };
  
  console.group('Токены авторизации');
  console.log('Auth токен:', tokens.authToken);
  console.log('Refresh токен:', tokens.refreshToken);
  console.groupEnd();
  
  return tokens;
};

// Добавляем функцию в глобальный объект window для удобства отладки
if (process.env.NODE_ENV === 'development') {
  window.debugTokens = debugTokens;
} 