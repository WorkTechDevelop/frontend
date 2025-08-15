"use client";

import { withRoleGuard } from "@/features/auth/components/with-role-guard";
import { UsersList } from "@/features/admin/components/users-list";
import { ProjectsList } from "@/features/admin/components/projects-list";
import { ROLES } from "@/features/auth/constants";

function AdminPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Панель администратора</h1>

      <div className="space-y-6">
        {/* Список пользователей с возможностью управления */}
        <UsersList />

        {/* Список проектов (только для просмотра) */}
        <ProjectsList />
      </div>
    </div>
  );
}

// Защищаем страницу - доступна только администраторам
export default withRoleGuard(AdminPage, {
  roles: ROLES.ADMIN,
  redirectTo: '/'
}); 