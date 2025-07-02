"use client";

import { z } from "zod";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ProjectAvatar } from "@/features/projects/components/project-avatar";

import { Input } from "@/components/ui/form/input";
import { Button } from "@/components/ui/controls/button";
import { Textarea } from "@/components/ui/form/textarea";
import { DottedSeparator } from "@/components/feedback/dotted-separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/layout/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/form/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form/form";

import { createTaskSchema } from "../schemas";
import { useCreateTask } from "../api/use-create-task";

interface CreateTaskFormProps {
  onCancel?: () => void;
  projectOptions: { id: string; name: string; imageUrl?: string }[];
  memberOptions: { id: string; name: string }[];
}

export const CreateTaskForm = ({
  onCancel,
  projectOptions,
}: CreateTaskFormProps) => {
  const { mutate, isPending } = useCreateTask();

  const form = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "MEDIUM",
      projectId: "",
      taskType: "TASK",
      assignee: "",
      estimation: 0,
    },
  });

  const onSubmit = (values: z.infer<typeof createTaskSchema>) => {
    mutate(values, {
      onSuccess: () => {
        form.reset();
        onCancel?.();
      },
    });
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">Создать новую задачу</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название задачи *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Введите название задачи" autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Описание</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Введите описание задачи"
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Проект *</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите проект" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />
                      <SelectContent>
                        {projectOptions.map((project) => (
                          <SelectItem key={project.id} value={project.id}>
                            <div className="flex items-center gap-x-2">
                              <ProjectAvatar
                                className="size-6"
                                name={project.name}
                              />
                              {project.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="assignee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Исполнитель *</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="ID или email пользователя"
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Приоритет</FormLabel>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите приоритет" />
                          </SelectTrigger>
                        </FormControl>
                        <FormMessage />
                        <SelectContent>
                          <SelectItem value="BLOCKER">🔴 Блокер</SelectItem>
                          <SelectItem value="HIGH">🟠 Высокий</SelectItem>
                          <SelectItem value="MEDIUM">🟡 Средний</SelectItem>
                          <SelectItem value="LOW">🟢 Низкий</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="taskType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Тип задачи</FormLabel>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите тип" />
                          </SelectTrigger>
                        </FormControl>
                        <FormMessage />
                        <SelectContent>
                          <SelectItem value="BUG">🐛 Баг</SelectItem>
                          <SelectItem value="TASK">📋 Задача</SelectItem>
                          <SelectItem value="RESEARCH">🔍 Исследование</SelectItem>
                          <SelectItem value="STORY">📖 История</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="estimation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Оценка (часы)</FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        type="number"
                        min="0"
                        max="999"
                        placeholder="Введите оценку в часах"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <DottedSeparator className="py-7" />
            
            <div className="flex items-center justify-between">
              <Button
                type="button"
                size="lg"
                variant="secondary"
                onClick={onCancel}
                disabled={isPending}
                className={cn(!onCancel && "invisible")}
              >
                Отмена
              </Button>

              <Button type="submit" size="lg" disabled={isPending}>
                Создать задачу
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
