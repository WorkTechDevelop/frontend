"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { SettingsIcon, UsersIcon, FolderIcon, ShieldIcon } from "lucide-react";
import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoHome,
  GoHomeFill,
} from "react-icons/go";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { Role, Permission, ROLES } from "@/features/auth/constants";

interface Route {
  label: string;
  href: string;
  icon: any;
  activeIcon: any;
  roles?: Role[];
  permissions?: Permission[];
  hideForRoles?: Role[];
}

const routes: Route[] = [
  { 
    label: "Главная", 
    href: "/", 
    icon: GoHome, 
    activeIcon: GoHomeFill 
  },
  {
    label: "Админ панель",
    href: "/admin",
    icon: ShieldIcon,
    activeIcon: ShieldIcon,
    roles: [ROLES.ADMIN]
  },
  {
    label: "Мои задачи",
    href: "/tasks",
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
    roles: [ROLES.PROJECT_OWNER, ROLES.PROJECT_MEMBER, ROLES.POWER_USER],
    hideForRoles: [ROLES.ADMIN]
  },
  {
    label: "Проекты",
    href: "/projects",
    icon: FolderIcon,
    activeIcon: FolderIcon,
    roles: [ROLES.PROJECT_OWNER, ROLES.PROJECT_MEMBER, ROLES.POWER_USER],
    hideForRoles: [ROLES.ADMIN]
  },
  {
    label: "Настройки",
    href: "/settings",
    icon: SettingsIcon,
    activeIcon: SettingsIcon,
  },
  {
    label: "Пользователи",
    href: "/users",
    icon: UsersIcon,
    activeIcon: UsersIcon,
    roles: [ROLES.ADMIN],
    permissions: ['view_users_list' as Permission]
  },
];

export const Navigation = () => {
  const pathname = usePathname();
  const { hasRole, hasPermission, roles } = useAuth();

  const isRouteVisible = (route: Route) => {
    // Проверяем, не должен ли маршрут быть скрыт для текущих ролей
    if (route.hideForRoles && roles.some(r => route.hideForRoles?.includes(r))) {
      return false;
    }

    // Проверяем необходимые роли и разрешения
    if (!route.roles && !route.permissions) return true;
    
    const hasRequiredRole = !route.roles || hasRole(route.roles);
    const hasRequiredPermission = !route.permissions || hasPermission(route.permissions);
    
    return hasRequiredRole && hasRequiredPermission;
  };

  return (
    <ul className="flex flex-col">
      {routes.filter(isRouteVisible).map((item) => {
        const isActive = pathname === item.href;
        const Icon = isActive ? item.activeIcon : item.icon;

        return (
          <Link key={item.href} href={item.href}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500",
                isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
              )}
            >
              <Icon className="size-5 text-neutral-500" />
              {item.label}
            </div>
          </Link>
        );
      })}
    </ul>
  );
};
