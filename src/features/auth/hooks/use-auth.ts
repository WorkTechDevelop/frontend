import { useMemo } from 'react';
import { useCurrent } from '../api/use-current';
import { Role, Permission, ROLES, ROLE_PERMISSIONS } from '../constants';

export const useAuth = () => {
  const { data: user, isLoading } = useCurrent();

  const roles = useMemo(() => {
    if (!user?.roles) return [];
    return user.roles.map(r => r.roleCode as Role).filter(Boolean);
  }, [user?.roles]);

  const permissions = useMemo(() => {
    const allPermissions = new Set<Permission>();
    roles.forEach(role => {
      ROLE_PERMISSIONS[role]?.forEach(permission => {
        allPermissions.add(permission);
      });
    });
    return Array.from(allPermissions);
  }, [roles]);

  const hasRole = (role: Role | Role[]) => {
    const rolesToCheck = Array.isArray(role) ? role : [role];
    return roles.some(r => rolesToCheck.includes(r));
  };

  const hasPermission = (permission: Permission | Permission[]) => {
    const permissionsToCheck = Array.isArray(permission) ? permission : [permission];
    return permissionsToCheck.every(p => permissions.includes(p));
  };

  // Роли
  const isAdmin = useMemo(() => hasRole(ROLES.ADMIN), [roles]);
  const isProjectOwner = useMemo(() => hasRole(ROLES.PROJECT_OWNER), [roles]);
  const isPowerUser = useMemo(() => hasRole(ROLES.POWER_USER), [roles]);
  const isProjectMember = useMemo(() => hasRole(ROLES.PROJECT_MEMBER), [roles]);

  // Разрешения для администратора
  const canManageProjectOwners = useMemo(() => hasPermission('manage_project_owners'), [permissions]);
  const canManageUsers = useMemo(() => hasPermission('manage_users'), [permissions]);
  const canManageAdmins = useMemo(() => hasPermission('manage_admins'), [permissions]);
  const canViewProjectsList = useMemo(() => hasPermission('view_projects_list'), [permissions]);
  const canViewUsersList = useMemo(() => hasPermission('view_users_list'), [permissions]);

  // Разрешения для руководителя проекта
  const canManageProjectMembers = useMemo(() => hasPermission('manage_project_members'), [permissions]);
  const canManageMemberPermissions = useMemo(() => hasPermission('manage_member_permissions'), [permissions]);
  const canManageSprints = useMemo(() => hasPermission('manage_sprints'), [permissions]);
  const canManageProjects = useMemo(() => hasPermission('manage_projects'), [permissions]);
  const canManageTasks = useMemo(() => hasPermission('manage_tasks'), [permissions]);
  const canManageStatuses = useMemo(() => hasPermission('manage_statuses'), [permissions]);

  return {
    user,
    roles,
    permissions,
    hasRole,
    hasPermission,
    isLoading,
    isAuthenticated: !!user,

    // Роли
    isAdmin,
    isProjectOwner,
    isPowerUser,
    isProjectMember,

    // Разрешения администратора
    canManageProjectOwners,
    canManageUsers,
    canManageAdmins,
    canViewProjectsList,
    canViewUsersList,

    // Разрешения руководителя проекта
    canManageProjectMembers,
    canManageMemberPermissions,
    canManageSprints,
    canManageProjects,
    canManageTasks,
    canManageStatuses,
  };
}; 