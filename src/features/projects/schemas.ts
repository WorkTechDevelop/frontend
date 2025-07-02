import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().trim().min(1, "Название проекта обязательно").max(50, "Максимум 50 символов"),
  code: z.string().trim().min(1, "Код проекта обязателен").max(10, "Максимум 10 символов"),
  description: z.string().max(4096, "Максимум 4096 символов").optional(),
  active: z.boolean().default(true),
});

export const updateProjectSchema = z.object({
  name: z.string().trim().min(1, "Название проекта обязательно").max(50, "Максимум 50 символов").optional(),
  description: z.string().max(4096, "Максимум 4096 символов").optional(),
  startDate: z.string().optional(),
  finishDate: z.string().optional(),
  status: z.enum(["DRAFT", "ACTIVE", "FINISHED", "DELETED"]).optional(),
}).refine((data) => {
  if (data.startDate && data.finishDate) {
    return new Date(data.finishDate) > new Date(data.startDate);
  }
  return true;
}, {
  message: "Дата окончания должна быть после даты начала",
  path: ["finishDate"],
});

export const projectFilterSchema = z.object({
  userIds: z.array(z.string()).optional(),
  statusIds: z.array(z.number()).optional(),
});
