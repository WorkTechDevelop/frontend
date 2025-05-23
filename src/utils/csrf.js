// Генерация CSRF-токена
function generateCSRFToken() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Получение CSRF-токена из localStorage или создание нового
export function getCSRFToken() {
    let token = localStorage.getItem('csrfToken');
    if (!token) {
        token = generateCSRFToken();
        localStorage.setItem('csrfToken', token);
    }
    return token;
}

// Обновление CSRF-токена
export function refreshCSRFToken() {
    const token = generateCSRFToken();
    localStorage.setItem('csrfToken', token);
    return token;
}

// Проверка CSRF-токена
export function validateCSRFToken(token) {
    const storedToken = localStorage.getItem('csrfToken');
    return token === storedToken;
}

// Добавление CSRF-токена в заголовки запроса
export function addCSRFTokenToHeaders(headers = {}) {
    return {
        ...headers,
        'X-CSRF-Token': getCSRFToken()
    };
}

// Функция для отладки токенов
export function debugTokens() {
    const tokens = {
        csrfToken: localStorage.getItem('csrfToken'),
        authToken: localStorage.getItem('authToken'),
        refreshToken: localStorage.getItem('refreshToken')
    };
    
    console.group('Токены приложения');
    console.log('CSRF токен:', tokens.csrfToken);
    console.log('Auth токен:', tokens.authToken);
    console.log('Refresh токен:', tokens.refreshToken);
    console.groupEnd();
    
    return tokens;
}

// Добавляем функцию в глобальный объект window для удобства отладки
if (process.env.NODE_ENV === 'development') {
    window.debugTokens = debugTokens;
} 