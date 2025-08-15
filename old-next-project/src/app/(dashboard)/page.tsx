"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrent } from "@/features/auth/api/use-current";
import { useCreateTaskModal } from "@/features/tasks/hooks/use-create-task-modal";
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";
import { useAuth } from "@/features/auth/hooks/use-auth";
import PageLoader from "@/components/feedback/page-loader";

export default function Home() {
  const router = useRouter();
  const { data: user, isLoading } = useCurrent();
  const { open: openTaskModal } = useCreateTaskModal();
  const { open: openProjectModal } = useCreateProjectModal();
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/sign-in");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (!user) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Work Task</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Карточки для не-админов */}
        {!isAdmin && (
          <>
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Мои проекты</h3>
              <p className="text-gray-600 mb-4">
                Просматривайте и управляйте вашими проектами
              </p>
              <a 
                href="/projects" 
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Перейти к проектам
              </a>
            </div>
            
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Мои задачи</h3>
              <p className="text-gray-600 mb-4">
                Просматривайте задачи назначенные на вас
              </p>
              <a 
                href="/tasks" 
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Мои задачи
              </a>
            </div>

            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Создать проект</h3>
              <p className="text-gray-600 mb-4">
                Начните новый проект для вашей команды
              </p>
              <button 
                onClick={openProjectModal}
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Создать проект
              </button>
            </div>

            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Создать задачу</h3>
              <p className="text-gray-600 mb-4">
                Быстро создайте новую задачу
              </p>
              <button 
                onClick={() => openTaskModal()}
                className="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/90"
              >
                Создать задачу
              </button>
            </div>
          </>
        )}

        {/* Карточки для админа */}
        {isAdmin && (
          <>
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Управление пользователями</h3>
              <p className="text-gray-600 mb-4">
                Управляйте пользователями системы
              </p>
              <a 
                href="/admin" 
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Перейти в админ панель
              </a>
            </div>

            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Список пользователей</h3>
              <p className="text-gray-600 mb-4">
                Просматривайте список всех пользователей
              </p>
              <a 
                href="/users" 
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Перейти к пользователям
              </a>
            </div>
          </>
        )}

        {/* Общие карточки */}
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Команда</h3>
          <p className="text-gray-600 mb-4">
            Управляйте участниками проектов
          </p>
          <button 
            disabled
            className="inline-flex items-center justify-center rounded-md bg-gray-300 px-4 py-2 text-sm font-medium text-gray-500 cursor-not-allowed"
          >
            Скоро доступно
          </button>
        </div>
      </div>
    </div>
  );
}
