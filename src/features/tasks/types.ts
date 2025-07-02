// WorkTech Task Types
export type TaskPriority = 'BLOCKER' | 'HIGH' | 'MEDIUM' | 'LOW';
export type TaskType = 'BUG' | 'TASK' | 'RESEARCH' | 'STORY';

// Для совместимости с существующими компонентами
export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS", 
  IN_REVIEW = "IN_REVIEW",
  DONE = "DONE",
  BACKLOG = "BACKLOG",
}

export interface TaskStatusShort {
  id: number;
  code: string;
  description?: string;
}

export interface TaskStatusData {
  id: number;
  priority: number;
  code: string;
  description?: string;
  viewed: boolean;
  projectId: string;
  defaultTaskStatus?: boolean;
}

export interface UserShortData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: 'MALE' | 'FEMALE';
}

export interface Task {
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
  creationDate?: string;
  updateDate?: string;
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

export interface TaskComment {
  user: UserShortData;
  commentId: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskLink {
  linkId: string;
  source: string;
  target: string;
  name: string;
  description: string;
}

export interface UsersTasksInProject {
  userName: string;
  tasks: Task[];
}
