# src/features/auth/components

UI-компоненты для аутентификации и управления пользователем.

## Структура
- **sign-in-card.tsx** — форма входа (логин).
- **sign-up-card.tsx** — форма регистрации.
- **user-button.tsx** — кнопка пользователя (аватар, меню).
- **role-guard.tsx** — компонент для защиты UI-элементов на основе ролей.
- **with-role-guard.tsx** — HOC для защиты страниц на основе ролей.

## Компоненты для работы с ролями

### RoleGuard
Компонент для условного рендеринга на основе ролей пользователя:

```tsx
import { RoleGuard } from './role-guard';

// Базовое использование
<RoleGuard roles="ADMIN">
  <AdminContent />
</RoleGuard>

// Множественные роли
<RoleGuard roles={['PROJECT_OWNER', 'ADMIN']}>
  <ManagerContent />
</RoleGuard>

// С альтернативным контентом
<RoleGuard 
  roles="PROJECT_OWNER" 
  fallback={<ReadOnlyView />}
>
  <EditableView />
</RoleGuard>

// С сообщением об ошибке
<RoleGuard 
  roles="ADMIN" 
  showError={true}
>
  <AdminSettings />
</RoleGuard>
```

### withRoleGuard
HOC для защиты страниц и перенаправления пользователей без нужных прав:

```tsx
import { withRoleGuard } from './with-role-guard';

// Защита страницы
export default withRoleGuard(AdminPage, {
  roles: 'ADMIN'
});

// С кастомным редиректом
export default withRoleGuard(ProjectSettingsPage, {
  roles: ['PROJECT_OWNER', 'ADMIN'],
  redirectTo: '/projects'
});
```

## Как работает
- Компоненты используют хук `useAuth` для проверки ролей пользователя.
- `RoleGuard` проверяет роли на клиенте и условно рендерит контент.
- `withRoleGuard` проверяет роли на сервере и делает редирект при необходимости.
- Для стилей используется Tailwind CSS.

## Пример использования в проекте

```tsx
// Страница настроек проекта
export default function ProjectSettingsPage() {
  return (
    <div>
      <h1>Настройки проекта</h1>
      
      {/* Базовые настройки доступны всем участникам */}
      <BasicSettings />
      
      {/* Продвинутые настройки только для владельцев */}
      <RoleGuard roles="PROJECT_OWNER">
        <AdvancedSettings />
      </RoleGuard>
      
      {/* Админ-панель только для админов */}
      <RoleGuard 
        roles="ADMIN"
        fallback={<p>Доступно только администраторам</p>}
      >
        <AdminPanel />
      </RoleGuard>
    </div>
  );
} 