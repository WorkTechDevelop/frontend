# src/features/projects/api

Здесь размещаются хуки и функции для работы с проектами через REST API WorkTech.

## Структура
- **use-create-project.ts** — создание нового проекта.
- **use-get-project.ts** — получение данных одного проекта.
- **use-get-projects.ts** — получение списка проектов пользователя.
- **...** — другие хуки для работы с проектами.

## Как работает
- Каждый хук инкапсулирует вызов определённого эндпоинта WorkTech API.
- Все хуки используют централизованный API-клиент (`rpc.ts`) для авторизации, обработки токенов и ошибок.
- Возвращают данные, статус загрузки, ошибки и функции для вызова (например, `mutate` для создания/обновления).

## Пример использования

```tsx
import { useGetProjects } from './use-get-projects';

const { data: projects, isLoading, error } = useGetProjects();

if (isLoading) return <Loader />;
if (error) return <ErrorMessage />;

return <ProjectList projects={projects} />;
```

> Все функции используют централизованный API-клиент (rpc.ts) для запросов к серверу. 