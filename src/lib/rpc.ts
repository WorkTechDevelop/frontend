import { buildApiUrl } from "@/config";
import { API_ENDPOINTS } from "@/config";

import {
  UserDataDto,
  LoginResponseDTO,
  RegisterDTO,
  ShortProjectDataDto,
  ProjectDto,
  TaskStatusDto,
  TaskModelDTO,
  UpdateTaskModelDTO,
  UpdateStatusRequestDTO,
  CommentDto,
  LinkDto,
  ProjectRequestDto,
  UpdateUserRequest,
  EnumValuesResponse,
  ProjectDataDto,
  SprintDtoRequest,
  SprintInfoDTO,
  TaskDataDto,
  CommentResponseDto,
  LinkResponseDto,
  AllTasksCommentsResponseDto,
  TaskHistoryResponseDto,
  StatusListResponseDto,
  CreateTaskStatusDto,
  StringIdsDto,
  UserShortDataDto,
  RoleDataResponse
} from "./types.api";

class WorkTechApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor() {
    this.baseUrl = buildApiUrl("");
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("access_token");
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    params?: Record<string, string>
  ): Promise<T> {
    if (typeof window === "undefined" && !this.token) {
      throw new Error("No token available on server");
    }

    const url = buildApiUrl(endpoint, params);

    const headers = new Headers({
      ...options.headers,
    });

    const method = options.method || "GET";
    if (method !== "GET" && method !== "HEAD") {
      headers.set("Content-Type", "application/json");
    }

    if (this.token) {
      const authHeader = `Bearer ${this.token}`;
      headers.set("Authorization", authHeader);
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (response.status === 401) {
        const refreshed = await this.refreshToken();
        if (refreshed) {
          headers.set("Authorization", `Bearer ${this.token}`);
          const retryResponse = await fetch(url, {
            ...options,
            headers,
          });
          return await this.handleResponse<T>(retryResponse);
        } else {
          this.clearToken();
          throw new Error("Unauthorized");
        }
      }

      return await this.handleResponse<T>(response);
    } catch (error) {
      console.error("❌ API Request failed:", error);
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
          error: "Network Error",
          message: `HTTP ${response.status}`,
        };
      }

      throw new Error(errorData.message || errorData.error || "Request failed");
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    return {} as T;
  }

  private async refreshToken(): Promise<boolean> {
    if (typeof window === "undefined") return false;

    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) return false;

    try {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.AUTH.REFRESH_TOKEN), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const data: LoginResponseDTO = await response.json();
        if (!data.accessToken || !data.refreshToken) {
          this.clearToken();
          return false;
        }
        this.token = data.accessToken;
        localStorage.setItem("access_token", data.accessToken);
        localStorage.setItem("refresh_token", data.refreshToken);
        return true;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
    }

    return false;
  }

  // AUTH =========================================================================================

  async login(email: string, password: string): Promise<LoginResponseDTO> {
    return this.request<LoginResponseDTO>(API_ENDPOINTS.AUTH.LOGIN, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async logout(): Promise<void> {
    return this.request<void>(API_ENDPOINTS.AUTH.LOGOUT, {
      method: "POST",
    });
  }

  async confirmEmail(token: string): Promise<boolean> {
    return this.request<boolean>(API_ENDPOINTS.AUTH.CONFIRM_EMAIL, {
      method: "GET",
    }, { token });
  }

  // REGISTRATION ================================================================================

  async register(data: RegisterDTO): Promise<string> {
    return this.request<string>(API_ENDPOINTS.REGISTRATION.REGISTER, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // USER =========================================================================================

  async updateUserProfile(data: UpdateUserRequest): Promise<UserDataDto> {
    return this.request<UserDataDto>(API_ENDPOINTS.USERS.UPDATE, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async getAllUsers(): Promise<UserShortDataDto[]> {
    return this.request<UserShortDataDto[]>(API_ENDPOINTS.USERS.GET_ALL);
  }

  async getUserProfile(): Promise<UserDataDto> {
    return this.request<UserDataDto>(API_ENDPOINTS.USERS.PROFILE);
  }

  async getUserGenderValues(): Promise<EnumValuesResponse> {
    return this.request<EnumValuesResponse>(API_ENDPOINTS.USERS.GENDER_VALUES);
  }

  async getUserById(userId: string): Promise<UserDataDto> {
    return this.request<UserDataDto>(API_ENDPOINTS.USERS.GET_BY_ID, {}, { userId });
  }

  // PROJECT =======================================================================================

  async startProject(projectId: string): Promise<ProjectDto> {
    return this.request<ProjectDto>(API_ENDPOINTS.PROJECTS.START, {
      method: "PUT",
    }, { projectId });
  }

  async finishProject(projectId: string): Promise<ProjectDto> {
    return this.request<ProjectDto>(API_ENDPOINTS.PROJECTS.FINISH, {
      method: "PUT",
    }, { projectId });
  }

  async addUsersToProject(projectId: string, data: StringIdsDto): Promise<void> {
    return this.request<void>(API_ENDPOINTS.PROJECTS.ADD_USERS, {
      method: "PUT",
      body: JSON.stringify(data),
    }, { projectId });
  }

  async removeUsersFromProject(projectId: string, data: StringIdsDto): Promise<void> {
    return this.request<void>(API_ENDPOINTS.PROJECTS.REMOVE_USERS, {
      method: "DELETE",
      body: JSON.stringify(data),
    }, { projectId });
  }

  async getProjectDataByFilter(projectId: string, data: ProjectDataDto): Promise<ProjectDataDto> {
    return this.request<ProjectDataDto>(API_ENDPOINTS.PROJECTS.GET_FILTERED, {
      method: "POST",
      body: JSON.stringify(data),
    }, { projectId });
  }

  async createProject(data: ProjectRequestDto): Promise<ProjectDto> {
    return this.request<ProjectDto>(API_ENDPOINTS.PROJECTS.CREATE, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getAllUserProjects(): Promise<ShortProjectDataDto[]> {
    return this.request<ShortProjectDataDto[]>(API_ENDPOINTS.PROJECTS.GET_ALL_USER);
  }

  async getActiveProject(): Promise<string> {
    return this.request<string>(API_ENDPOINTS.PROJECTS.GET_ACTIVE);
  }

  async getProjectById(projectId: string): Promise<ProjectDto> {
    return this.request<ProjectDto>(API_ENDPOINTS.PROJECTS.GET_BY_ID, {}, { projectId });
  }

  // SPRINT =======================================================================================

  async createSprint(projectId: string, data: SprintDtoRequest): Promise<SprintInfoDTO> {
    return this.request<SprintInfoDTO>(API_ENDPOINTS.SPRINTS.CREATE, {
      method: "POST",
      body: JSON.stringify(data),
    }, { projectId });
  }

  async updateSprint(projectId: string, sprintId: string, data: SprintDtoRequest): Promise<SprintInfoDTO> {
    return this.request<SprintInfoDTO>(API_ENDPOINTS.SPRINTS.UPDATE, {
      method: "PUT",
      body: JSON.stringify(data),
    }, { projectId, sprintId });
  }

  async activateSprint(projectId: string, sprintId: string): Promise<SprintInfoDTO> {
    return this.request<SprintInfoDTO>(API_ENDPOINTS.SPRINTS.ACTIVATE, {
      method: "PUT",
    }, { projectId, sprintId });
  }

  async finishSprint(projectId: string, sprintId: string): Promise<SprintInfoDTO> {
    return this.request<SprintInfoDTO>(API_ENDPOINTS.SPRINTS.FINISH, {
      method: "PUT",
    }, { projectId, sprintId });
  }

  async getSprintInfo(projectId: string): Promise<SprintInfoDTO> {
    return this.request<SprintInfoDTO>(API_ENDPOINTS.SPRINTS.GET_INFO, {}, { projectId });
  }

  // TASK ========================================================================================

  async createTask(data: TaskModelDTO): Promise<TaskDataDto> {
    return this.request<TaskDataDto>(API_ENDPOINTS.TASKS.CREATE, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateTask(projectId: string, taskId: string, data: UpdateTaskModelDTO): Promise<TaskDataDto> {
    return this.request<TaskDataDto>(API_ENDPOINTS.TASKS.UPDATE, {
      method: "PUT",
      body: JSON.stringify(data),
    }, { projectId, taskId });
  }

  async updateTaskStatus(data: UpdateStatusRequestDTO): Promise<TaskDataDto> {
    return this.request<TaskDataDto>(API_ENDPOINTS.TASKS.UPDATE_STATUS, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async getTaskHistory(projectId: string, taskId: string): Promise<TaskHistoryResponseDto[]> {
    return this.request<TaskHistoryResponseDto[]>(API_ENDPOINTS.TASKS.GET_HISTORY, {}, { projectId, taskId });
  }

  async getTasksInProject(): Promise<TaskDataDto[]> {
    return this.request<TaskDataDto[]>(API_ENDPOINTS.TASKS.GET_ALL_IN_PROJECT);
  }

  async createTaskLink(data: LinkDto): Promise<LinkResponseDto> {
    return this.request<LinkResponseDto>(API_ENDPOINTS.TASKS.LINK, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getTaskLinks(taskId: string, projectId: string): Promise<LinkResponseDto[]> {
    return this.request<LinkResponseDto[]>(API_ENDPOINTS.TASKS.GET_LINKS, {}, { taskId, projectId });
  }

  async createComment(data: CommentDto): Promise<CommentResponseDto> {
    return this.request<CommentResponseDto>(API_ENDPOINTS.TASKS.CREATE_COMMENT, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateComment(data: CommentDto): Promise<CommentResponseDto> {
    return this.request<CommentResponseDto>(API_ENDPOINTS.TASKS.UPDATE_COMMENT, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteComment(commentId: string, taskId: string, projectId: string): Promise<void> {
    return this.request<void>(API_ENDPOINTS.TASKS.DELETE_COMMENT, {
      method: "DELETE",
    }, { commentId, taskId, projectId });
  }

  async getComments(taskId: string, projectId: string): Promise<AllTasksCommentsResponseDto[]> {
    return this.request<AllTasksCommentsResponseDto[]>(API_ENDPOINTS.TASKS.GET_COMMENTS, {}, { taskId, projectId });
  }

  // STATUS ======================================================================================

  async getStatuses(projectId: string): Promise<StatusListResponseDto> {
    return this.request<StatusListResponseDto>(API_ENDPOINTS.STATUSES.GET_ALL, {}, { projectId });
  }

  async createStatus(projectId: string, data: CreateTaskStatusDto): Promise<TaskStatusDto> {
    return this.request<TaskStatusDto>(API_ENDPOINTS.STATUSES.CREATE, {
      method: "POST",
      body: JSON.stringify(data),
    }, { projectId });
  }

  async updateStatuses(projectId: string, data: TaskStatusDto[]): Promise<StatusListResponseDto> {
    return this.request<StatusListResponseDto>(API_ENDPOINTS.STATUSES.UPDATE, {
      method: "PUT",
      body: JSON.stringify({ statuses: data }),
    }, { projectId });
  }

  // ADMIN =======================================================================================

  async blockUsers(data: StringIdsDto): Promise<void> {
    return this.request<void>(API_ENDPOINTS.ADMIN.BLOCK_USERS, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async activateUsers(data: StringIdsDto): Promise<void> {
    return this.request<void>(API_ENDPOINTS.ADMIN.ACTIVATE_USERS, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async updateUserRoles(userId: string, data: StringIdsDto): Promise<UserDataDto> {
    return this.request<UserDataDto>(API_ENDPOINTS.ADMIN.UPDATE_ROLES, {
      method: "PUT",
      body: JSON.stringify(data),
    }, { userId });
  }

  async updateProjectOwner(projectId: string, userId: string): Promise<void> {
    return this.request<void>(API_ENDPOINTS.ADMIN.UPDATE_OWNER, {
      method: "PUT",
    }, { projectId, userId });
  }

  async addExtendedPermission(projectId: string, userId: string): Promise<void> {
    return this.request<void>(API_ENDPOINTS.ADMIN.ADD_PERMISSION, {
      method: "PUT",
    }, { projectId, userId });
  }

  async removeExtendedPermission(projectId: string, userId: string): Promise<void> {
    return this.request<void>(API_ENDPOINTS.ADMIN.REMOVE_PERMISSION, {
      method: "PUT",
    }, { projectId, userId });
  }

  // ROLES =======================================================================================

  async getRoles(): Promise<RoleDataResponse> {
    return this.request<RoleDataResponse>(API_ENDPOINTS.ROLES.GET_ALL);
  }
}

export const workTechApi = new WorkTechApiClient();
