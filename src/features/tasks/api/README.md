# src/features/tasks/api

Здесь размещаются хуки и функции для работы с задачами через REST API WorkTech.

## Структура
- **use-get-tasks.ts** — получение всех задач активного проекта через `getTasksInProject`.
- **use-create-task.ts** — создание новой задачи с преобразованием типов.
- **use-update-task.ts** — обновление задачи с указанием projectId и taskId.
- **utils.ts** — вспомогательные функции для преобразования типов данных между API и фронтендом.
- **...** — другие хуки для работы с комментариями, статусами, связями задач и т.д.

## Как работает
- Каждый хук инкапсулирует вызов определённого эндпоинта WorkTech API.
- Все хуки используют централизованный API-клиент (`rpc.ts`) для авторизации, обработки токенов и ошибок.
- Возвращают данные, статус загрузки, ошибки и функции для вызова (например, `mutate` для создания/обновления).
- Используют функции из `utils.ts` для преобразования типов данных между API и фронтендом.

## Пример использования

```tsx
import { useGetTasks } from './use-get-tasks';

const { data: tasks, isLoading, error } = useGetTasks();

if (isLoading) return <Loader />;
if (error) return <ErrorMessage />;

return <TaskList tasks={tasks} />;
```

## Преобразование типов

Все ответы от API преобразуются в типы, используемые во фронтенде:
- `TaskDataDto` → `Task`
- `UserShortDataDto` → `UserShortData`

Пример:
```tsx
import { useCreateTask } from './use-create-task';

const { mutate } = useCreateTask();

// Данные автоматически преобразуются в нужный формат
mutate({
  title: "Новая задача",
  priority: "HIGH",
  // ...другие поля
});
```

> Все функции используют централизованный API-клиент (rpc.ts) для запросов к серверу и функции из utils.ts для преобразования типов. 