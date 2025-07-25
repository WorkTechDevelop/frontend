# Компоненты разметки

## Структура
```
layout/
  ├── mobile-sidebar.tsx    # Мобильная версия сайдбара
  ├── navbar.tsx           # Верхняя навигационная панель
  ├── query-provider.tsx   # Провайдер React Query
  └── sidebar.tsx         # Основной сайдбар
```

## QueryProvider

### Описание
Компонент для настройки и инициализации React Query в приложении.

### Конфигурация
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,  // Данные считаются свежими 5 минут
      gcTime: 10 * 60 * 1000,    // Удаление из кэша через 10 минут
      refetchOnWindowFocus: false,// Нет автообновления при фокусе
      refetchOnReconnect: false, // Нет автообновления при реконнекте
      retry: 1,                 // Одна повторная попытка при ошибке
    },
  },
});
```

### Особенности
- Singleton для браузера (один экземпляр QueryClient)
- Отдельный экземпляр для сервера
- Оптимизированные настройки кэширования
- Контроль повторных запросов

### Использование
```typescript
// _app.tsx или layout.tsx
import { QueryProvider } from './components/layout/query-provider';

export default function App({ children }) {
  return (
    <QueryProvider>
      {children}
    </QueryProvider>
  );
}
```

## Sidebar

### Описание
Основной компонент боковой навигации.

### Компоненты
- `Logo` - логотип приложения
- `WorkspaceSwitcher` - переключатель рабочих пространств
- `Navigation` - основная навигация
- `Projects` - список проектов

### Адаптивность
- Полная версия для десктопа
- Мобильная версия через `MobileSidebar`

## Navbar

### Описание
Верхняя навигационная панель.

### Функциональность
- Поиск
- Уведомления
- Профиль пользователя
- Быстрые действия

## MobileSidebar

### Описание
Мобильная версия сайдбара.

### Особенности
- Выдвижное меню
- Оптимизировано для тач-устройств
- Анимации открытия/закрытия 