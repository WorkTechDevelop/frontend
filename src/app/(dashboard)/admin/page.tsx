"use client";

import { useState } from "react";
import { withRoleGuard } from "@/features/auth/components/with-role-guard";
import { RoleGuard } from "@/features/auth/components/role-guard";
import { useAuth } from "@/features/auth/hooks/use-auth";

function AdminPage() {
  const { 
    canManageProjectOwners,
    canManageUsers,
    canManageAdmins,
    canViewProjectsList,
    canViewUsersList,
  } = useAuth();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Панель администратора</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Управление руководителями проектов */}
        <RoleGuard permissions="manage_project_owners">
          <div className="p-4 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Руководители проектов</h2>
            {/* Здесь будет компонент управления руководителями */}
          </div>
        </RoleGuard>

        {/* Управление пользователями */}
        <RoleGuard permissions="manage_users">
          <div className="p-4 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Управление пользователями</h2>
            {/* Здесь будет компонент управления пользователями */}
          </div>
        </RoleGuard>

        {/* Управление администраторами */}
        <RoleGuard permissions="manage_admins">
          <div className="p-4 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Управление администраторами</h2>
            {/* Здесь будет компонент управления администраторами */}
          </div>
        </RoleGuard>

        {/* Список проектов */}
        <RoleGuard permissions="view_projects_list">
          <div className="p-4 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Список проектов</h2>
            {/* Здесь будет компонент списка проектов */}
          </div>
        </RoleGuard>

        {/* Список пользователей */}
        <RoleGuard permissions="view_users_list">
          <div className="p-4 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Список пользователей</h2>
            {/* Здесь будет компонент списка пользователей */}
          </div>
        </RoleGuard>
      </div>
    </div>
  );
}

// Защищаем всю страницу - доступна только администраторам
export default withRoleGuard(AdminPage, {
  roles: 'ADMIN',
  redirectTo: '/dashboard'
}); 