# src/features/auth

Модуль аутентификации и управления пользователями.

## Структура
- **api/** — хуки и функции для работы с API (логин, логаут, регистрация, профиль и т.д.).
- **components/** — UI-компоненты для аутентификации (формы входа, регистрации, кнопка пользователя и т.д.).
- **hooks/** — хуки для работы с авторизацией и ролями.
- **constants.ts** — константы, используемые в модуле.
- **queries.ts** — функции для получения данных пользователя.
- **schemas.ts** — схемы валидации форм (zod).

## Роли пользователей
В системе поддерживаются следующие роли:
- **ADMIN** — администратор системы
  - Управление пользователями и ролями
  - Доступ только к административным функциям
  - Нет доступа к проектам и задачам
- **PROJECT_OWNER** — владелец проекта
  - Полное управление проектами
  - Управление участниками
  - Управление задачами
- **PROJECT_MEMBER** — участник проекта
  - Базовая работа с задачами
  - Просмотр проектов
- **POWER_USER** — пользователь с расширенными правами
  - Расширенная работа с задачами
  - Управление спринтами (при наличии доступа)

## Оптимизация API запросов

### Блокировка ненужных запросов
- Запросы к API проектов не выполняются для админов
- Запросы проверяются на соответствие ролям
- Учитывается состояние загрузки пользователя

### Кэширование
- Данные пользователя кэшируются
- Роли проверяются локально
- Используется React Query для оптимизации

## Компоненты для работы с ролями

### RoleGuard
Компонент для защиты UI-элементов на основе ролей:

```tsx
import { RoleGuard } from './components/role-guard';

// Показать только админам
<RoleGuard roles="ADMIN">
  <AdminPanel />
</RoleGuard>

// Показать владельцам проекта и админам
<RoleGuard roles={['PROJECT_OWNER', 'ADMIN']}>
  <ProjectSettings />
</RoleGuard>

// С fallback компонентом
<RoleGuard 
  roles="PROJECT_OWNER" 
  fallback={<ReadOnlyView />}
>
  <EditableView />
</RoleGuard>
```

### withRoleGuard
HOC для защиты страниц на основе ролей:

```tsx
import { withRoleGuard } from './components/with-role-guard';

// Страница только для админов
export default withRoleGuard(AdminPage, { 
  roles: 'ADMIN',
  redirectTo: '/dashboard' 
});

// Страница для владельцев проекта и админов
export default withRoleGuard(ProjectSettingsPage, {
  roles: ['PROJECT_OWNER', 'ADMIN']
});
```

### useAuth
Хук для работы с авторизацией и ролями:

```tsx
import { useAuth } from './hooks/use-auth';

function MyComponent() {
  const { 
    user,
    roles,
    hasRole,
    isAdmin,
    isProjectOwner,
    isPowerUser,
    isAuthenticated,
    isLoading 
  } = useAuth();

  if (isAdmin) {
    return <AdminView />;
  }

  if (hasRole(['PROJECT_OWNER', 'POWER_USER'])) {
    return <PowerUserView />;
  }

  return <RegularUserView />;
}
```

## Принципы
- Все взаимодействия с сервером идут через REST API WorkTech
- Логика разделена на хуки (api) и UI-компоненты (components)
- Используются централизованные типы и схемы для валидации и передачи данных
- Доступ к функционалу контролируется на основе ролей пользователя
- Оптимизация запросов с учетом ролей пользователя 