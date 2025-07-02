"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrent } from "@/features/auth/api/use-current";
import { useGetProject } from "@/features/projects/api/use-get-project";
import { useCreateTaskModal } from "@/features/tasks/hooks/use-create-task-modal";
import { PageLoader } from "@/components/feedback/page-loader";
import { Button } from "@/components/ui/controls/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/layout/card";
import { Badge } from "@/components/ui/feedback/badge";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { 
  PlusIcon, 
  ArrowLeftIcon, 
  UsersIcon, 
  CalendarIcon, 
  FolderIcon,
  UserIcon 
} from "lucide-react";

interface PageProps {
  params: {
    projectId: string;
  };
}

export default function ProjectPage({ params }: PageProps) {
  const router = useRouter();
  const projectId = params.projectId;
  const { data: user, isLoading: isLoadingUser } = useCurrent();
  const { data: project, isLoading: isLoadingProject } = useGetProject({ projectId });
  const { open: openCreateModal } = useCreateTaskModal();

  useEffect(() => {
    if (!user && !isLoadingUser) {
      router.push("/sign-in");
    }
  }, [user, isLoadingUser, router]);

  if (isLoadingUser || isLoadingProject) {
    return <PageLoader />;
  }

  if (!user) {
    return <PageLoader />;
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-semibold mb-2">Проект не найден</h3>
          <p className="text-gray-600 mb-4">
            Проект с данным ID не существует или у вас нет доступа к нему
          </p>
          <Button onClick={() => router.push("/projects")}>
            <ArrowLeftIcon className="size-4 mr-2" />
            Вернуться к проектам
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Не указано";
    return new Date(dateString).toLocaleDateString("ru-RU");
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Заголовок проекта */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/projects")}
        >
          <ArrowLeftIcon className="size-4 mr-2" />
          Назад к проектам
        </Button>
      </div>

      {/* Информация о проекте */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <ProjectAvatar name={project.name} className="size-12" />
                <div>
                  <h1 className="text-2xl font-bold">{project.name}</h1>
                  <p className="text-gray-600">Код: {project.code}</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {project.description && (
                <div>
                  <h3 className="font-semibold mb-2">Описание:</h3>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="size-4 text-gray-500" />
                  <span>Создан: {formatDate(project.creationDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="size-4 text-gray-500" />
                  <span>Начало: {formatDate(project.startDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserIcon className="size-4 text-gray-500" />
                  <span>Создатель: {project.creator.firstName} {project.creator.lastName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserIcon className="size-4 text-gray-500" />
                  <span>Владелец: {project.owner.firstName} {project.owner.lastName}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Статистика */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Статус проекта</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className={project.active ? "bg-green-500" : "bg-red-500"}>
                {project.active ? "Активный" : "Неактивный"}
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <UsersIcon className="size-4" />
                Участники
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600">
                {project.users?.length || 0} участников
              </div>
              {project.users && project.users.length > 0 && (
                <div className="mt-2 space-y-1">
                  {project.users.slice(0, 3).map((user) => (
                    <div key={user.id} className="text-xs text-gray-500">
                      {user.firstName} {user.lastName}
                    </div>
                  ))}
                  {project.users.length > 3 && (
                    <div className="text-xs text-gray-400">
                      и еще {project.users.length - 3}...
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Статусы задач</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600">
                {project.statuses?.length || 0} статусов
              </div>
              {project.statuses && project.statuses.length > 0 && (
                <div className="mt-2 space-y-1">
                  {project.statuses.slice(0, 3).map((status) => (
                    <div key={status.id} className="text-xs text-gray-500">
                      {status.description || status.code}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Задачи проекта */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Задачи проекта</h2>
          <Button onClick={() => openCreateModal()}>
            <PlusIcon className="size-4 mr-2" />
            Создать задачу
          </Button>
        </div>

        {/* Пока показываем заглушку, так как нужен API для получения задач проекта */}
        <Card>
          <CardContent className="py-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="mb-4">
                <div className="mx-auto size-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <FolderIcon className="size-8 text-gray-400" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Задачи проекта</h3>
              <p className="text-gray-600 mb-4">
                Здесь будут отображаться задачи этого проекта. 
                API для получения задач по проекту будет добавлен позже.
              </p>
              <Button onClick={() => openCreateModal()}>
                <PlusIcon className="size-4 mr-2" />
                Создать задачу для проекта
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 