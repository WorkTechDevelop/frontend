"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrent } from "@/features/auth/api/use-current";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";
import PageLoader from "@/components/feedback/page-loader";
import { Button } from "@/components/ui/controls/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/layout/card";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { PlusIcon } from "lucide-react";

export default function ProjectsPage() {
  const router = useRouter();
  const { data: user, isLoading: isLoadingUser } = useCurrent();
  const { data: projects, isLoading: isLoadingProjects } = useGetProjects();
  const { open: openCreateModal } = useCreateProjectModal();

  useEffect(() => {
    if (!user && !isLoadingUser) {
      router.push("/sign-in");
    }
  }, [user, isLoadingUser, router]);

  if (isLoadingUser) {
    return <PageLoader />;
  }

  if (!user) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Мои проекты</h1>
          <p className="text-gray-600">Управляйте своими проектами</p>
        </div>
        <Button onClick={openCreateModal}>
          <PlusIcon className="size-4 mr-2" />
          Создать проект
        </Button>
      </div>

      {isLoadingProjects ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-20 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : projects && projects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ProjectAvatar name={project.name} className="size-8" />
                  <span className="truncate">{project.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-gray-600">
                    ID проекта: <span className="font-mono">{project.id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => router.push(`/projects/${project.id}`)}
                    >
                      Открыть
                    </Button>
                    <div className="text-xs text-gray-500">
                      Проект
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="mb-4">
              <div className="mx-auto size-16 bg-gray-100 rounded-full flex items-center justify-center">
                <PlusIcon className="size-8 text-gray-400" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Нет проектов</h3>
            <p className="text-gray-600 mb-4">
              Создайте свой первый проект, чтобы начать работу с задачами
            </p>
            <Button onClick={openCreateModal}>
              <PlusIcon className="size-4 mr-2" />
              Создать первый проект
            </Button>
          </div>
        </div>
      )}
    </div>
  );
} 