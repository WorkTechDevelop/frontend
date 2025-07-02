# src/components/layout

Компоненты для layout и структуры страниц приложения.

## Содержимое
- **navbar.tsx** — верхняя панель навигации.
- **sidebar.tsx** — боковая панель (sidebar).
- **mobile-sidebar.tsx** — мобильная версия sidebar.
- **query-provider.tsx** — провайдер для работы с react-query.

## Принципы
- Компоненты отвечают за структуру и размещение основных блоков приложения.
- Используются на уровне layout страниц.

## Пример использования

```tsx
import { Navbar } from './navbar';
import { Sidebar } from './sidebar';

<Navbar />
<Sidebar />
``` 