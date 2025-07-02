// WorkTech API Types based on OpenAPI Schema

export interface ErrorResponse {
  error: string;
  message: string;
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  phone?: string;
  birthDate?: string;
  gender: 'MALE' | 'FEMALE';
}

export interface TokenRefreshRequest {
  refreshToken: string;
}

// User Types
export interface UserShortData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: 'MALE' | 'FEMALE';
}

export interface RoleDataDto {
  roleId: string;
  roleCode: string;
  roleName: string;
}

export interface UserData extends UserShortData {
  userId: string;
  middleName?: string;
  phone?: string;
  birthDate?: string;
  active: boolean;
  roles: RoleDataDto[];
}

export interface UpdateUserRequest {
  lastName: string;
  firstName: string;
  middleName?: string;
  email: string;
  phone?: string;
  birthDate?: string;
  password: string;
  confirmPassword: string;
}

// Project Types
export interface ShortProjectData {
  id: string;
  name: string;
}

export interface ProjectRequest {
  name: string;
  description?: string;
  code: string;
  active?: boolean;
}

export interface Project {
  id: string;
  name: string;
  owner: UserShortData;
  creationDate: string;
  finishDate?: string;
  startDate: string;
  updateDate?: string;
  description?: string;
  active: boolean;
  creator: UserShortData;
  finisher?: UserShortData;
  code: string;
  statuses: TaskStatus[];
  users: UserShortData[];
}

export interface ProjectDataFilter {
  userIds?: string[];
  statusIds?: number[];
}

export interface UserWithTasks extends UserShortData {
  tasks: TaskData[];
}

export interface ProjectData {
  users: UserWithTasks[];
}

// Task Types
export type TaskPriority = 'BLOCKER' | 'HIGH' | 'MEDIUM' | 'LOW';
export type TaskType = 'BUG' | 'TASK' | 'RESEARCH' | 'STORY';

export interface TaskModel {
  title: string;
  description?: string;
  priority: TaskPriority;
  assignee: string;
  projectId: string;
  sprintId?: string;
  taskType: TaskType;
  estimation?: number;
}

export interface UpdateTaskModel extends TaskModel {
  id: string;
  status?: number;
}

export interface TaskStatusShort {
  id: number;
  code: string;
  description?: string;
}

export interface TaskData {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  assignee: UserShortData;
  creator: UserShortData;
  projectId: string;
  sprintId?: string;
  taskType: TaskType;
  status: TaskStatusShort;
  estimation?: number;
  code: string;
}

export interface UpdateStatusRequest {
  projectId: string;
  id: string;
  status?: number;
}

export interface UsersTasksInProject {
  userName: string;
  tasks: Record<string, unknown>[]; // Generic task data
}

export interface TaskHistory {
  user: UserShortData;
  fieldName: string;
  initialValue: string;
  initialUser?: UserShortData;
  newValue: string;
  newUser?: UserShortData;
  createdAt: string;
}

// Sprint Types
export interface SprintRequest {
  name: string;
  startDate?: string;
  endDate?: string;
}

export interface Sprint {
  id: string;
  name: string;
  startDate?: string;
  endDate?: string;
  creator: UserShortData;
  active: boolean;
  defaultSprint: boolean;
}

// Status Types
export interface TaskStatusRequest {
  id?: number;
  priority: number;
  code: string;
  description?: string;
  viewed?: boolean;
  defaultTaskStatus?: boolean;
}

export interface TaskStatus extends TaskStatusRequest {
  id: number;
  projectId: string;
  viewed: boolean;
}

export interface StatusListResponse {
  projectId: string;
  statuses: TaskStatus[];
}

export interface UpdateRequestStatuses {
  statuses: TaskStatusRequest[];
}

// Comment Types
export interface CommentRequest {
  taskId: string;
  projectId: string;
  comment: string;
}

export interface UpdateCommentRequest extends CommentRequest {
  commentId: string;
}

export interface CommentResponse {
  commentId: string;
}

export interface AllTasksCommentsResponse {
  user: UserShortData;
  commentId: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

// Link Types
export interface LinkRequest {
  taskIdSource: string;
  taskIdTarget: string;
  projectId: string;
  linkTypeName?: string;
}

export interface LinkResponse {
  linkId: string;
  source: string;
  target: string;
  name: string;
  description: string;
}

// API Response wrapper
export interface ApiResponse<T = Record<string, unknown>> {
  data?: T;
  error?: string;
  message?: string;
}

// Common ID list type
export interface StringIds {
  ids: string[];
} 