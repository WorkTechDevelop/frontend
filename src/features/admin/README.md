# Модуль администрирования

## Структура
```
admin/
  ├── api/                           # API хуки
  │   ├── use-activate-users.ts      # Разблокировка пользователей
  │   ├── use-block-users.ts         # Блокировка пользователей
  │   ├── use-get-user-info.ts       # Получение информации о пользователе
  │   ├── use-manage-extended-permissions.ts  # Управление расширенными правами
  │   ├── use-update-project-owner.ts # Управление владельцами проектов
  │   └── use-update-user-roles.ts    # Управление ролями пользователей
  ├── components/                    # UI компоненты
  │   ├── users-list.tsx            # Список пользователей
  │   └── projects-list.tsx         # Список проектов
  └── README.md                     # Документация модуля
```

## Функциональность

### Управление пользователями
- Блокировка/разблокировка пользователей
- Назначение/снятие роли администратора
- Просмотр полной информации о пользователях
- Управление ролями пользователей

### Управление проектами
- Просмотр списка всех проектов (краткая информация)
- Назначение владельцев проектов
- Управление расширенными правами участников

## API хуки

### Пользователи
- `useBlockUsers` - блокировка пользователей
- `useActivateUsers` - разблокировка пользователей
- `useUpdateUserRoles` - управление ролями
- `useGetUserInfo` - информация о пользователе

### Проекты
- `useUpdateProjectOwner` - назначение владельца
- `useManageExtendedPermissions` - управление правами

## Компоненты

### UsersList
- Отображение списка пользователей
- Управление статусом и ролями
- Множественный выбор для массовых операций

### ProjectsList
- Отображение списка проектов
- Краткая информация о каждом проекте
- Только для просмотра (без управления)

## Права доступа

### Необходимые разрешения
- `manage_users` - управление пользователями
- `view_users_list` - просмотр списка пользователей
- `manage_admins` - управление администраторами
- `view_projects_list` - просмотр списка проектов

### Роли
Доступ к админ-панели имеют только пользователи с ролью `ADMIN`

## Оптимизация

### Кэширование
- Кэширование данных пользователей (10 минут)
- Кэширование списка проектов
- Автоматическая инвалидация при изменениях

### API запросы
- Предотвращение лишних запросов
- Оптимизация загрузки данных
- Обработка состояний загрузки

## Безопасность
- Проверка прав на уровне компонентов
- Проверка прав на уровне страницы
- Защита от несанкционированного доступа
- Безопасное управление ролями

## Интеграция
- Использование React Query для запросов
- Интеграция с системой ролей
- Связь с другими модулями через API 