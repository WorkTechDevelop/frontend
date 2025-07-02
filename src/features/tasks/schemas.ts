import { z } from "zod";

export const taskPriorityEnum = z.enum(["BLOCKER", "HIGH", "MEDIUM", "LOW"]);
export const taskTypeEnum = z.enum(["BUG", "TASK", "RESEARCH", "STORY"]);

export const createTaskSchema = z.object({
  title: z.string().trim().min(1, "Заголовок обязателен").max(255, "Максимум 255 символов"),
  description: z.string().max(4096, "Максимум 4096 символов").optional(),
  priority: taskPriorityEnum,
  assignee: z.string().trim().min(1, "Исполнитель обязателен"),
  projectId: z.string().trim().min(1, "Проект обязателен"),
  sprintId: z.string().optional(),
  taskType: taskTypeEnum,
  estimation: z.number().min(0, "Оценка не может быть отрицательной").max(999, "Максимум 999").optional(),
});

export const createTaskScema = createTaskSchema;

export const updateTaskSchema = z.object({
  id: z.string().trim().min(1, "ID задачи обязателен"),
  title: z.string().trim().min(1, "Заголовок обязателен").max(255, "Максимум 255 символов"),
  description: z.string().max(4096, "Максимум 4096 символов").optional(),
  priority: taskPriorityEnum,
  assignee: z.string().trim().min(1, "Исполнитель обязателен"),
  projectId: z.string().trim().min(1, "Проект обязателен"),
  sprintId: z.string().optional(),
  taskType: taskTypeEnum,
  status: z.number().optional(),
  estimation: z.number().min(0, "Оценка не может быть отрицательной").max(999, "Максимум 999").optional(),
});

export const updateTaskStatusSchema = z.object({
  projectId: z.string().trim().min(1, "ID проекта обязателен"),
  id: z.string().trim().min(1, "ID задачи обязателен"),
  status: z.number().optional(),
});

export const createCommentSchema = z.object({
  taskId: z.string().trim().min(1, "ID задачи обязателен"),
  projectId: z.string().trim().min(1, "ID проекта обязателен"),
  comment: z.string().trim().min(1, "Комментарий не может быть пустым").max(4096, "Максимум 4096 символов"),
});

export const updateCommentSchema = z.object({
  commentId: z.string().trim().min(1, "ID комментария обязателен"),
  taskId: z.string().trim().min(1, "ID задачи обязателен"),
  projectId: z.string().trim().min(1, "ID проекта обязателен"),
  comment: z.string().trim().min(1, "Комментарий не может быть пустым").max(4096, "Максимум 4096 символов"),
});

export const linkTaskSchema = z.object({
  taskIdSource: z.string().trim().min(1, "ID исходной задачи обязателен"),
  taskIdTarget: z.string().trim().min(1, "ID целевой задачи обязателен"),
  projectId: z.string().trim().min(1, "ID проекта обязателен"),
  linkTypeName: z.string().optional(),
});
