"use client";

import { ComponentType } from 'react';
import { redirect } from 'next/navigation';
import { Role, Permission, ROLE_PERMISSIONS } from '../constants';
import { useAuth } from '../hooks/use-auth';

interface WithRoleGuardOptions {
  roles?: Role | Role[];
  permissions?: Permission | Permission[];
  redirectTo?: string;
}

export function withRoleGuard<P extends object>(
  WrappedComponent: ComponentType<P>,
  { roles, permissions, redirectTo = '/' }: WithRoleGuardOptions = {}
) {
  return function GuardedComponent(props: P) {
    const { user, isLoading, hasRole, hasPermission } = useAuth();
    
    if (isLoading) {
      return <div>Загрузка...</div>;
    }

    if (!user) {
      redirect('/sign-in');
    }

    if (roles || permissions) {
      // Проверяем роли
      const hasRequiredRoles = !roles || hasRole(roles);

      // Проверяем разрешения
      const hasRequiredPermissions = !permissions || hasPermission(permissions);

      // Если нет нужных прав - редирект
      if (!hasRequiredRoles || !hasRequiredPermissions) {
        redirect(redirectTo);
      }
    }

    return <WrappedComponent {...props} />;
  };
} 