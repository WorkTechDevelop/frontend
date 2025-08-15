# API хуки администрирования

## Управление пользователями

### useBlockUsers
```typescript
const { mutateAsync } = useBlockUsers();
await mutateAsync(userIds: string[]);
```
Блокировка пользователей по их ID.

### useActivateUsers
```typescript
const { mutateAsync } = useActivateUsers();
await mutateAsync(userIds: string[]);
```
Разблокировка пользователей по их ID.

### useUpdateUserRoles
```typescript
const { mutateAsync } = useUpdateUserRoles();
await mutateAsync({ userId: string, roleIds: string[] });
```
Обновление ролей пользователя.

### useGetUserInfo
```typescript
const { data, isLoading } = useGetUserInfo(userId: string);
```
Получение полной информации о пользователе.

## Управление проектами

### useUpdateProjectOwner
```typescript
const { mutateAsync } = useUpdateProjectOwner();
await mutateAsync({ projectId: string, userId: string });
```
Назначение владельца проекта.

### useManageExtendedPermissions
```typescript
const { addPermission, removePermission } = useManageExtendedPermissions();

// Добавление расширенных прав
await addPermission.mutateAsync({ projectId, userId });

// Удаление расширенных прав
await removePermission.mutateAsync({ projectId, userId });
```
Управление расширенными правами пользователей в проекте.

## Особенности

### Кэширование
- Все хуки интегрированы с React Query
- Автоматическая инвалидация связанных данных
- Оптимистичные обновления где возможно

### Обработка ошибок
- Все хуки включают обработку ошибок
- Логирование в консоль для отладки
- Типизированные ответы API

### Инвалидация кэша
При успешных мутациях инвалидируются:
- Данные пользователя (`["user", userId]`)
- Список пользователей (`["users"]`)
- Данные проекта (`["project", projectId]`)
- Текущий пользователь (`["current"]`)

### Оптимизация
- Запросы выполняются только при наличии необходимых параметров
- Кэширование данных на 10 минут
- Предотвращение лишних запросов

## Примеры использования

### Блокировка пользователей
```typescript
const { mutateAsync, isLoading } = useBlockUsers();

const handleBlock = async (userIds: string[]) => {
  try {
    await mutateAsync(userIds);
    // Обработка успеха
  } catch (error) {
    // Обработка ошибки
  }
};
```

### Управление ролями
```typescript
const { mutateAsync } = useUpdateUserRoles();

const makeAdmin = async (userId: string) => {
  try {
    await mutateAsync({
      userId,
      roleIds: ["admin_role_id"]
    });
    // Обработка успеха
  } catch (error) {
    // Обработка ошибки
  }
};
```

### Получение информации о пользователе
```typescript
const { data, isLoading, error } = useGetUserInfo(userId);

if (isLoading) return <Loader />;
if (error) return <Error />;
if (data) {
  // Отображение данных пользователя
}
``` 