"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/form/input";
import { Button } from "@/components/ui/controls/button";
import { Textarea } from "@/components/ui/form/textarea";
import { DottedSeparator } from "@/components/feedback/dotted-separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/layout/card";
import { Form } from "@/components/ui/form/form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form/form";

import { createProjectSchema } from "../schemas";
import { useCreateProject } from "../api/use-create-project";

interface CreateProjectFormProps {
  onCancel?: () => void;
}

export const CreateProjectForm = ({ onCancel }: CreateProjectFormProps) => {
  const router = useRouter();
  const { mutate, isPending } = useCreateProject();

  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      code: "",
      description: "",
      active: true,
    },
  });

  const onSubmit = (values: z.infer<typeof createProjectSchema>) => {
    mutate(values, {
      onSuccess: (data) => {
        form.reset();
        router.push(`/projects/${data.id}`);
      },
    });
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">
          Создать новый проект
        </CardTitle>
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название проекта *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Введите название проекта" autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Код проекта *</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="Введите уникальный код (например: WT, PROJ)" 
                        maxLength={10}
                        style={{ textTransform: 'uppercase' }}
                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                        autoComplete="off"
                      />
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
                        placeholder="Введите описание проекта"
                        rows={4}
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
                Создать проект
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
