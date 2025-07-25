"use client";

import { withRoleGuard } from "@/features/auth/components/with-role-guard";
import { RoleGuard } from "@/features/auth/components/role-guard";
import { useAuth } from "@/features/auth/hooks/use-auth";

function ProjectSettingsPage() {
  const {
    canManageProjectMembers,
    canManageMemberPermissions,
    canManageSprints,
    canManageProjects,
    canManageStatuses,
  } = useAuth();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Настройки проекта</h1>

      <div className="space-y-6">
        {/* Основные настройки проекта */}
        <RoleGuard permissions="manage_projects">
          <div className="p-4 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Основные настройки</h2>
            {/* Здесь будет форма основных настроек проекта */}
          </div>
        </RoleGuard>

        {/* Управление участниками */}
        <RoleGuard permissions="manage_project_members">
          <div className="p-4 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Участники проекта</h2>
            {/* Здесь будет компонент управления участниками */}
          </div>
        </RoleGuard>

        {/* Управление правами участников */}
        <RoleGuard permissions="manage_member_permissions">
          <div className="p-4 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Права участников</h2>
            {/* Здесь будет компонент управления правами */}
          </div>
        </RoleGuard>

        {/* Управление спринтами */}
        <RoleGuard permissions="manage_sprints">
          <div className="p-4 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Настройки спринтов</h2>
            {/* Здесь будет компонент настроек спринтов */}
          </div>
        </RoleGuard>

        {/* Управление статусами */}
        <RoleGuard permissions="manage_statuses">
          <div className="p-4 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Настройки статусов</h2>
            {/* Здесь будет компонент управления статусами */}
          </div>
        </RoleGuard>
      </div>
    </div>
  );
}

// Страница доступна только владельцам проекта
export default withRoleGuard(ProjectSettingsPage, {
  roles: 'PROJECT_OWNER',
  redirectTo: '/dashboard'
}); 