# src/components/navigation

Компоненты для навигации по приложению.

## Содержимое
- **navigation.tsx** — основной компонент навигации с поддержкой ролевой модели.
- **workspace-switcher.tsx** — переключатель рабочих пространств.

## Навигация по ролям

### Администратор
- Главная
- Админ панель
- Пользователи
- Настройки

### Руководитель проекта
- Главная
- Мои задачи
- Проекты
- Настройки

### Участник проекта (обычный и с расширенными правами)
- Главная
- Мои задачи
- Проекты
- Настройки

## Принципы
- Компоненты отвечают за перемещение пользователя между разделами приложения
- Используют ролевую модель для отображения доступных пунктов меню
- Поддерживают активное состояние текущего раздела
- Используются в layout и на страницах

## Пример использования

```tsx
import { Navigation } from './navigation';

// Навигация автоматически определит роль пользователя
// и покажет доступные пункты меню
<Navigation />
```

## Как это работает

### Проверка прав доступа
```tsx
const isRouteVisible = (route: Route) => {
  if (!route.roles && !route.permissions) return true;
  
  const hasRequiredRole = !route.roles || hasRole(route.roles);
  const hasRequiredPermission = !route.permissions || hasPermission(route.permissions);
  
  return hasRequiredRole && hasRequiredPermission;
};
```

### Определение маршрутов
```tsx
interface Route {
  label: string;      // Название пункта меню
  href: string;       // URL маршрута
  icon: any;          // Иконка для неактивного состояния
  activeIcon: any;    // Иконка для активного состояния
  roles?: Role[];     // Необходимые роли (опционально)
  permissions?: Permission[]; // Необходимые разрешения (опционально)
}
``` 