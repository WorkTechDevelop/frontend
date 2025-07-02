import { buildApiUrl } from "@/config";
import { 
  LoginResponse, 
  UserData, 
  ShortProjectData, 
  Project, 
  TaskStatus, 
  RegisterRequest, 
  TaskModel, 
  UpdateTaskModel, 
  UpdateStatusRequest, 
  CommentRequest, 
  LinkRequest, 
  ProjectRequest,
  RoleDataDto
} from "./types";
import { Task, TaskComment, TaskLink } from "../features/tasks/types";

class WorkTechApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor() {
    this.baseUrl = buildApiUrl('');
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('access_token');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    params?: Record<string, string>
  ): Promise<T> {
    if (typeof window === 'undefined' && !this.token) {
      throw new Error('No token available on server');
    }

    const url = buildApiUrl(endpoint, params);
    
    const headers = new Headers({
      ...options.headers,
    });

    const method = options.method || 'GET';
    if (method !== 'GET' && method !== 'HEAD') {
      headers.set('Content-Type', 'application/json');
    }

    if (this.token) {
      const authHeader = `Bearer ${this.token}`;
      headers.set('Authorization', authHeader);
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (response.status === 401) {
        const refreshed = await this.refreshToken();
        if (refreshed) {
          headers.set('Authorization', `Bearer ${this.token}`);
          const retryResponse = await fetch(url, {
            ...options,
            headers,
          });
          return await this.handleResponse<T>(retryResponse);
        } else {
          this.clearToken();
          throw new Error('Unauthorized');
        }
      }

      return await this.handleResponse<T>(response);
    } catch (error) {
      console.error('❌ API Request failed:', error);
      throw error;
    }
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { 
          error: 'Network Error', 
          message: `HTTP ${response.status}` 
        };
      }
      
      throw new Error(errorData.message || errorData.error || 'Request failed');
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return {} as T;
  }

  private async refreshToken(): Promise<boolean> {
    if (typeof window === 'undefined') return false;
    
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) return false;

    try {
      const response = await fetch(buildApiUrl('/auth/refresh'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const data: LoginResponse = await response.json();
        this.token = data.accessToken;
        localStorage.setItem('access_token', data.accessToken);
        localStorage.setItem('refresh_token', data.refreshToken);
        return true;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }

    return false;
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    return this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(data: RegisterRequest): Promise<string> {
    return this.request<string>('/registration/registry', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getCurrentUser(): Promise<UserData> {
    return this.request<UserData>('/users/profile');
  }

  async getRoles(): Promise<{ roles: RoleDataDto[] }> {
    return this.request<{ roles: RoleDataDto[] }>('/roles');
  }

  async getProjects(): Promise<ShortProjectData[]> {
    return this.request<ShortProjectData[]>('/projects/all-user-project');
  }

  async getProject(projectId: string): Promise<Project> {
    return this.request<Project>('/projects/{projectId}', {}, { projectId });
  }

  async createProject(data: ProjectRequest): Promise<Project> {
    return this.request<Project>('/projects/create-project', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getTasks(): Promise<Task[]> {
    return this.request<Task[]>('/task/tasks-in-project');
  }

  async createTask(data: TaskModel): Promise<Task> {
    return this.request<Task>('/task/create-task', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTask(data: UpdateTaskModel): Promise<Task> {
    return this.request<Task>('/task/update-task', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async updateTaskStatus(data: UpdateStatusRequest): Promise<Task> {
    return this.request<Task>('/task/update-status', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getStatuses(projectId: string): Promise<{ projectId: string; statuses: TaskStatus[] }> {
    return this.request<{ projectId: string; statuses: TaskStatus[] }>('/status/project/{projectId}/statuses', {}, { projectId });
  }

  async getComments(taskId: string, projectId: string): Promise<TaskComment[]> {
    return this.request<TaskComment[]>('/task/all-comments/{taskId}/{projectId}', {}, { taskId, projectId });
  }

  async createComment(data: CommentRequest): Promise<{ commentId: string }> {
    return this.request<{ commentId: string }>('/task/create-comment', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getTaskLinks(taskId: string, projectId: string): Promise<TaskLink[]> {
    return this.request<TaskLink[]>('/task/all-links/{taskId}/{projectId}', {}, { taskId, projectId });
  }

  async linkTasks(data: LinkRequest): Promise<TaskLink> {
    return this.request<TaskLink>('/task/link-task', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const client = new WorkTechApiClient();
