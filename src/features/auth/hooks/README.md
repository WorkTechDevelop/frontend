# src/features/auth/hooks

Хуки для работы с авторизацией и ролями пользователей.

## Структура
- **use-auth.ts** — основной хук для работы с авторизацией и ролями.

## useAuth
Хук предоставляет доступ к данным пользователя и его ролям:

```tsx
import { useAuth } from './use-auth';

function MyComponent() {
  const {
    // Данные пользователя
    user,              // Полные данные пользователя
    isAuthenticated,   // Флаг авторизации
    isLoading,        // Флаг загрузки

    // Роли
    roles,            // Массив ролей пользователя
    hasRole,          // Функция проверки роли
    
    // Хелперы для проверки конкретных ролей
    isAdmin,          // Админ?
    isProjectOwner,   // Владелец проекта?
    isPowerUser,      // Пользователь с расширенными правами?
  } = useAuth();

  // Проверка одной роли
  if (isAdmin) {
    return <AdminView />;
  }

  // Проверка нескольких ролей
  if (hasRole(['PROJECT_OWNER', 'POWER_USER'])) {
    return <PowerUserView />;
  }

  return <RegularUserView />;
}
```

## Типы ролей
```ts
type Role = 'ADMIN' | 'PROJECT_OWNER' | 'PROJECT_MEMBER' | 'POWER_USER';
```

## Как работает
- Хук использует `useCurrent` для получения данных пользователя.
- Роли кэшируются с помощью `useMemo` для оптимизации.
- Предоставляет удобные хелперы для проверки конкретных ролей.
- Типизирован с помощью TypeScript для безопасности типов. 