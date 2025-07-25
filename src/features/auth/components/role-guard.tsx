import { ReactNode } from 'react';
import { useAuth } from '../hooks/use-auth';
import { Role, Permission } from '../constants';

interface RoleGuardProps {
  children: ReactNode;
  roles?: Role | Role[];
  permissions?: Permission | Permission[];
  fallback?: ReactNode;
  showError?: boolean;
}

export const RoleGuard = ({
  children,
  roles,
  permissions,
  fallback = null,
  showError = false,
}: RoleGuardProps) => {
  const { hasRole, hasPermission, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;
  if (!isAuthenticated) return null;
  
  // Если нет ограничений, показываем контент
  if (!roles && !permissions) return <>{children}</>;

  // Проверяем роли и разрешения
  const hasAccess = (
    !roles || hasRole(roles)
  ) && (
    !permissions || hasPermission(permissions)
  );

  if (!hasAccess) {
    if (showError) {
      return (
        <div className="flex items-center justify-center p-4 text-sm text-red-600">
          У вас нет прав для просмотра этого контента
        </div>
      );
    }
    return fallback;
  }

  return <>{children}</>;
}; 