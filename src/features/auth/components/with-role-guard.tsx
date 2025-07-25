import { ComponentType } from 'react';
import { redirect } from 'next/navigation';
import { Role, Permission, ROLE_PERMISSIONS } from '../constants';
import { getCurrent } from '../queries';

interface WithRoleGuardOptions {
  roles?: Role | Role[];
  permissions?: Permission | Permission[];
  redirectTo?: string;
}

export function withRoleGuard<P extends object>(
  WrappedComponent: ComponentType<P>,
  { roles, permissions, redirectTo = '/dashboard' }: WithRoleGuardOptions = {}
) {
  return async function GuardedComponent(props: P) {
    const user = await getCurrent();
    
    if (!user) {
      redirect('/sign-in');
    }

    if (roles || permissions) {
      // Получаем роли пользователя
      const userRoles = user.roles?.map(r => r.roleCode as Role).filter(Boolean) || [];
      
      // Проверяем роли
      const requiredRoles = Array.isArray(roles) ? roles : roles ? [roles] : [];
      const hasRequiredRoles = !roles || requiredRoles.some(r => userRoles.includes(r));

      // Получаем все разрешения пользователя
      const userPermissions = new Set<Permission>();
      userRoles.forEach(role => {
        ROLE_PERMISSIONS[role]?.forEach(permission => {
          userPermissions.add(permission);
        });
      });

      // Проверяем разрешения
      const requiredPermissions = Array.isArray(permissions) ? permissions : permissions ? [permissions] : [];
      const hasRequiredPermissions = !permissions || requiredPermissions.every(p => userPermissions.has(p));

      // Если нет нужных прав - редирект
      if (!hasRequiredRoles || !hasRequiredPermissions) {
        redirect(redirectTo);
      }
    }

    return <WrappedComponent {...props} />;
  };
} 