import { TaskDataDto, UserShortDataDto } from "@/lib/types.api";
import { Task, TaskPriority, UserShortData } from "../types";

export const mapUserShortDataDtoToUserShortData = (dto: UserShortDataDto): UserShortData => {
  return {
    id: dto.id,
    email: dto.email,
    firstName: dto.firstName,
    lastName: dto.lastName || '',
    gender: dto.gender as UserShortData['gender'],
  };
};

export const mapTaskDataDtoToTask = (dto: TaskDataDto): Task => {
  return {
    id: dto.id,
    title: dto.title,
    description: dto.description,
    priority: dto.priority as TaskPriority,
    assignee: dto.assignee ? mapUserShortDataDtoToUserShortData(dto.assignee) : {
      id: '',
      email: '',
      firstName: '',
      lastName: '',
      gender: 'MALE',
    },
    creator: dto.creator ? mapUserShortDataDtoToUserShortData(dto.creator) : {
      id: '',
      email: '',
      firstName: '',
      lastName: '',
      gender: 'MALE',
    },
    projectId: dto.projectId,
    sprintId: dto.sprintId,
    taskType: dto.taskType as Task['taskType'],
    status: {
      id: dto.status?.id || 0,
      code: dto.status?.code || '',
      description: dto.status?.description,
    },
    estimation: dto.estimation,
    code: dto.code || '',
    creationDate: undefined,
    updateDate: undefined,
  };
}; 