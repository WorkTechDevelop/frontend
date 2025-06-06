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
    const token = localStorage.getItem('authToken') || localStorage.getItem('token');
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
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      sessionStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

// Сервис для работы с проектами
export const projectService = {
  // Установить выбранный проект как основной для пользователя
  setActiveProject: async (projectId) => {
    try {
      const response = await api.post(`/work-task/v1/projects/set-project/${projectId}`);
      return response.data;
    } catch (error) {
      console.error('Error setting active project:', error);
      throw error;
    }
  },
  
  // Получить список всех проектов пользователя
  getUserProjects: async () => {
    try {
      const response = await api.get('/work-task/v1/projects/users-projects');
      return response.data;
    } catch (error) {
      console.error('Error fetching user projects:', error);
      throw error;
    }
  },
  
  // Получить список проектов пользователя (альтернативная ручка)
  getAllUserProjects: async () => {
    try {
      const response = await api.get('/work-task/v1/projects/all-user-project');
      return response.data;
    } catch (error) {
      console.error('Error fetching all user projects:', error);
      throw error;
    }
  },
  
  // Получить ID активного проекта пользователя
  getActiveProject: async () => {
    try {
      const response = await api.get('/work-task/v1/projects/active-project');
      return response.data;
    } catch (error) {
      console.error('Error fetching active project:', error);
      throw error;
    }
  }
};

// Сервис для работы со спринтами
export const sprintService = {
  // Получить информацию об активном спринте
  getSprintInfo: async () => {
    try {
      const response = await api.get('/work-task/v1/sprint/sprint-info');
      return response.data;
    } catch (error) {
      console.error('Error fetching sprint info:', error);
      throw error;
    }
  }
};

// Сервис для работы с задачами
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
  },
  
  // Обновить задачу
  updateTask: async (taskData) => {
    try {
      const response = await api.put('/work-task/v1/task/update-task', taskData);
      return response.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },
  
  // Обновить статус задачи
  updateTaskStatus: async (statusData) => {
    try {
      const response = await api.put('/work-task/v1/task/update-status', statusData);
      return response.data;
    } catch (error) {
      console.error('Error updating task status:', error);
      throw error;
    }
  },
  
  // Создать новую задачу
  createTask: async (taskData) => {
    try {
      const response = await api.post('/work-task/v1/task/create-task', taskData);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },
  
  // Получить задачу по коду
  getTaskByCode: async (code) => {
    try {
      const response = await api.get(`/work-task/v1/task/${code}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching task by code:', error);
      throw error;
    }
  }
};

export const authService = {
  // Логин пользователя
  login: async (credentials) => {
    try {
      const response = await api.post('/work-task/v1/auth/login', credentials);
      console.log('Login response:', response.data);
      // Сохраняем токен из accessToken или token
      if (response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('authToken', response.data.accessToken);
      }
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('authToken', response.data.token);
      }
      // Сохраняем информацию о пользователе
      if (response.data.user) {
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Регистрация пользователя
  register: async (userData) => {
    try {
      const response = await api.post('/work-task/v1/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
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