// import { useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'
import { DashboardLayout } from '../../widget/DashboardLayout'
import { workTechApi } from '../../shared/api/workTechHttpClient'
import { API_ENDPOINTS } from '../../shared/api/endpoint'
import {
  clearTokens,
  saveAccessToken,
  saveRefreshToken,
} from '../../shared/api/token'
// import { useRouter } from "next/navigation";
// import { useCurrent } from "@/features/auth/api/use-current";
// import { useCreateTaskModal } from "@/features/tasks/hooks/use-create-task-modal";
// import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";
// import PageLoader from "@/components/feedback/page-loader";

export function MainPage() {
  // const router = useRouter();
  // const { data: user, isLoading } = useCurrent();
  // const { open: openTaskModal } = useCreateTaskModal();
  // const { open: openProjectModal } = useCreateProjectModal();

  // useEffect(() => {
  //   if (!user && !isLoading) {
  //     router.push("/sign-in");
  //   }
  // }, [user, isLoading, router]);

  // if (isLoading) {
  //   return <PageLoader />;
  // }

  // if (!user) {
  //   return <PageLoader />;
  // }

  useEffect(() => {
    workTechApi
      .post(API_ENDPOINTS.AUTH.LOGIN(), {
        email: 'test3@mail.ru',
        password: 'password12345',
      })
      .then((response) => {
        // TODO: вынести эту логику в отдельную фукнцию / хук
        if (!response.data.accessToken || !response.data.refreshToken) {
          clearTokens()
          throw new Error('no tokens in response on refresh')
        }

        saveAccessToken(response.data.accessToken!)
        saveRefreshToken(response.data.refreshToken!)
        console.log({ result: response })
      })
    //
  }, [])

  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Work Task</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
              // onClick={openProjectModal}
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Создать проект
            </button>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Создать задачу</h3>
            <p className="text-gray-600 mb-4">Быстро создайте новую задачу</p>
            <button
              // onClick={() => openTaskModal()}
              className="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/90"
            >
              Создать задачу
            </button>
          </div>

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

          <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Аналитика</h3>
            <p className="text-gray-600 mb-4">
              Просматривайте статистику по проектам
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
    </DashboardLayout>
  )
}
