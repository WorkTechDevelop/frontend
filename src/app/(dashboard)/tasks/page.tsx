"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrent } from "@/features/auth/api/use-current";
import { useGetTasks } from "@/features/tasks/api/use-get-tasks";
import { useCreateTaskModal } from "@/features/tasks/hooks/use-create-task-modal";
import PageLoader from "@/components/feedback/page-loader";
import { Button } from "@/components/ui/controls/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/layout/card";
import { Badge } from "@/components/ui/feedback/badge";
import { PlusIcon, CalendarIcon, UserIcon, FolderIcon } from "lucide-react";

export default function TasksPage() {
  const router = useRouter();
  const { data: user, isLoading: isLoadingUser } = useCurrent();
  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks();
  const { open: openCreateModal } = useCreateTaskModal();

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "BLOCKER": return "bg-red-500 text-white";
      case "HIGH": return "bg-orange-500 text-white";
      case "MEDIUM": return "bg-yellow-500 text-black";
      case "LOW": return "bg-green-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "BUG": return "🐛";
      case "TASK": return "📋";
      case "RESEARCH": return "🔍";
      case "STORY": return "📖";
      default: return "📋";
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Мои задачи</h1>
          <p className="text-gray-600">Управляйте вашими задачами</p>
        </div>
        <Button onClick={() => openCreateModal()}>
          <PlusIcon className="size-4 mr-2" />
          Создать задачу
        </Button>
      </div>

      {isLoadingTasks ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
      ) : tasks && tasks.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <Card key={task.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getTypeIcon(task.taskType)}</span>
                    <span className="truncate text-sm">{task.title}</span>
                  </div>
                  <Badge className={getPriorityColor(task.priority)} variant="secondary">
                    {task.priority}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {task.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {task.description}
                  </p>
                )}
                
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <FolderIcon className="size-3" />
                  <span>ID: {task.projectId}</span>
                </div>

                {task.assignee && (
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <UserIcon className="size-3" />
                    <span>
                      {typeof task.assignee === 'string' 
                        ? task.assignee 
                        : `${task.assignee.firstName} ${task.assignee.lastName}`}
                    </span>
                  </div>
                )}

                {task.estimation && (
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CalendarIcon className="size-3" />
                    <span>{task.estimation}ч</span>
                  </div>
                )}

                <div className="flex justify-between items-center mt-4">
                  <Badge variant="outline" className="text-xs">
                    {task.status?.description || 'В работе'}
                  </Badge>
                  <div className="text-xs text-gray-400">
                    #{task.code || task.id}
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
            <h3 className="text-lg font-semibold mb-2">Нет задач</h3>
            <p className="text-gray-600 mb-4">
              Создайте вашу первую задачу, чтобы начать работу
            </p>
            <Button onClick={() => openCreateModal()}>
              <PlusIcon className="size-4 mr-2" />
              Создать первую задачу
            </Button>
          </div>
        </div>
      )}
    </div>
  );
} 