# src/features/projects/components

UI-компоненты для работы с проектами.

## Структура
- **create-project-form.tsx** — форма создания проекта.
- **create-project-modal.tsx** — модальное окно для создания проекта.
- **edit-project-form.tsx.disabled** — старая/отключённая форма редактирования проекта.
- **project-avatar.tsx** — аватар проекта.
- **...** — другие компоненты для отображения и управления проектами.

## Как работает
- Компоненты используют хуки из папки `api` для получения и изменения данных.
- Все компоненты максимально переиспользуемы и не содержат бизнес-логики вне UI.
- Для стилей используется Tailwind CSS.

## Пример использования

```tsx
import { CreateProjectForm } from './create-project-form';

<CreateProjectForm onSubmit={handleCreate} />
```

> Компоненты используют хуки и API из соседних папок. 