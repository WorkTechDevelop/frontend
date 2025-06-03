import axios from 'axios';

const API_BASE_URL = 'http://91.211.249.37/test';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor для добавления токена в запросы
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Interceptor для обработки ответов
api.interceptors.response.use(
  response => response,
  error => {
    // Если 401 Unauthorized, редиректим на страницу логина
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const taskService = {
  // Получить все задачи активного проекта, отсортированные по пользователям
  getTasksInProject: async () => {
    try {
      const response = await api.get('/work-task/v1/task/tasks-in-project');
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }
};

export const authService = {
  // Логин пользователя
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        // Сохраняем информацию о пользователе
        if (response.data.user) {
          sessionStorage.setItem('user', JSON.stringify(response.data.user));
        }
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Выход пользователя
  logout: () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');
  },

  // Проверка, авторизован ли пользователь
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export default api; 