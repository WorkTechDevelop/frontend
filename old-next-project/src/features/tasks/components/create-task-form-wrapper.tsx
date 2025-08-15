"use client";

import { Loader } from "lucide-react";

import { Card, CardContent } from "@/components/ui/layout/card";
import { useGetProjects } from "@/features/projects/api/use-get-projects";

import { CreateTaskForm } from "./create-task-form";

interface CreateTaskFormWrapperProps {
  onCancel?: () => void;
}

export const CreateTaskFormWrapper = ({
  onCancel,
}: CreateTaskFormWrapperProps) => {
  const { data: projects, isLoading: isLoadingProjects } = useGetProjects();

  const isLoading = isLoadingProjects;

  if (isLoading) {
    return (
      <Card className="w-full h-[714px] border-none shadow-none">
        <CardContent className="flex items-center justify-center h-full">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <CreateTaskForm 
      onCancel={onCancel} 
      projectOptions={projects?.map(p => ({ 
        id: p.id, 
        name: p.name, 
        imageUrl: '' // У WorkTech нет изображений проектов
      })) || []} 
      memberOptions={[]} // Пустой список пока нет API для участников
    />
  );
};
