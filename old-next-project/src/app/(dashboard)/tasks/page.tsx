"use client";

import { withRoleGuard } from "@/features/auth/components/with-role-guard";
import { RoleGuard } from "@/features/auth/components/role-guard";
import { useAuth } from "@/features/auth/hooks/use-auth";

function TasksPage() {
  const {
    canManageTasks,
    canManageSprints,
    isProjectOwner,
    isPowerUser,
  } = useAuth();

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Задачи</h1>
        
        {/* Кнопка создания задачи - доступна всем с правом manage_tasks */}
        <RoleGuard permissions="manage_tasks">
          <button className="btn btn-primary">
            Создать задачу
          </button>
        </RoleGuard>
      </div>

      {/* Управление спринтами - только для тех, у кого есть права */}
      <RoleGuard permissions="manage_sprints">
        <div className="mb-6 p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Управление спринтами</h2>
          {/* Здесь будет компонент управления спринтами */}
        </div>
      </RoleGuard>

      {/* Список задач - разный вид для разных ролей */}
      <div className="space-y-4">
        {/* Для владельцев проекта и power users - полный доступ */}
        <RoleGuard roles={['PROJECT_OWNER', 'POWER_USER']}>
          <div className="p-4 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Все задачи проекта</h2>
            {/* Здесь будет расширенный компонент списка задач */}
          </div>
        </RoleGuard>

        {/* Для обычных участников - только их задачи */}
        <RoleGuard 
          roles="PROJECT_MEMBER"
          fallback={null}
        >
          <div className="p-4 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Мои задачи</h2>
            {/* Здесь будет базовый компонент списка задач */}
          </div>
        </RoleGuard>
      </div>
    </div>
  );
}

// Страница доступна всем участникам проекта
export default withRoleGuard(TasksPage, {
  roles: ['PROJECT_OWNER', 'PROJECT_MEMBER', 'POWER_USER'],
  redirectTo: '/dashboard'
}); 