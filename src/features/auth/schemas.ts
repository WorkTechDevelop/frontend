import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(8, "Минимум 8 символов"),
});

export const registerSchema = z.object({
  firstName: z.string().trim().min(1, "Имя обязательно"),
  lastName: z.string().trim().min(1, "Фамилия обязательна"),
  middleName: z.string().trim().optional(),
  email: z.string().email("Некорректный email"),
  phone: z.string().optional(),
  birthDate: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE"], {
    required_error: "Выберите пол",
  }),
  password: z
    .string()
    .min(8, "Минимум 8 символов")
    .regex(/(?=.*[0-9])/, "Должна быть минимум одна цифра")
    .regex(/(?=.*[a-zA-Z])/, "Должна быть минимум одна буква")
    .regex(/(?=.*[!@#$%^&*])/, "Должен быть минимум один спецсимвол"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

export const updateUserSchema = z.object({
  firstName: z.string().trim().min(1, "Имя обязательно"),
  lastName: z.string().trim().min(1, "Фамилия обязательна"),
  middleName: z.string().trim().optional(),
  email: z.string().email("Некорректный email"),
  phone: z.string().optional(),
  birthDate: z.string().optional(),
  password: z
    .string()
    .min(8, "Минимум 8 символов")
    .regex(/(?=.*[0-9])/, "Должна быть минимум одна цифра")
    .regex(/(?=.*[a-zA-Z])/, "Должна быть минимум одна буква")
    .regex(/(?=.*[!@#$%^&*])/, "Должен быть минимум один спецсимвол"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});
