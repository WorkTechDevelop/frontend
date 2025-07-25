export const AUTH_COOKIE = "t1t2t3-worktask-session";

export const ROLES = {
  ADMIN: 'ADMIN',
  PROJECT_OWNER: 'PROJECT_OWNER',
  PROJECT_MEMBER: 'PROJECT_MEMBER',
  POWER_USER: 'POWER_USER',
} as const;

// Разрешения для каждой роли
export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    'manage_project_owners',      // Назначение/снятие руководителя проектов
    'manage_users',              // Блокировка/разблокировка пользователя
    'manage_admins',             // Назначение/снятие администратора
    'view_projects_list',        // Доступ к списку проектов
    'view_users_list',          // Доступ к списку пользователей
  ],
  
  [ROLES.PROJECT_OWNER]: [
    'manage_project_members',     // Добавление/удаление пользователей в проект
    'manage_member_permissions',  // Назначение доп. функций участникам
    'manage_sprints',            // Управление спринтами
    'manage_projects',           // Управление проектами
    'manage_tasks',              // Управление задачами
    'manage_statuses',           // Управление статусами
  ],
  
  [ROLES.POWER_USER]: [
    'manage_sprints',            // Управление спринтами (если есть доступ)
    'manage_tasks',              // Базовое управление задачами
    'basic_actions',             // Базовые действия участника
  ],
  
  [ROLES.PROJECT_MEMBER]: [
    'basic_actions',             // Базовые действия (регистрация, авторизация и т.д.)
    'manage_tasks',              // Базовое управление задачами
  ],
} as const;

// Типы для TypeScript
export type Role = keyof typeof ROLES;
export type Permission = typeof ROLE_PERMISSIONS[Role][number];
