# src/features/projects/hooks

Кастомные React-хуки для управления состоянием проектов.

## Структура
- **use-create-project-modal.ts** — управление модальным окном создания проекта.
- **use-project-id.ts** — получение id текущего проекта из URL или состояния.
- **...** — другие хуки для управления состоянием проектов.

## Как работает
- Хуки не делают прямых запросов к API, а только управляют состоянием, модалками, фильтрами и т.д.
- Используются внутри компонентов для организации логики отображения и взаимодействия.

## Пример использования

```tsx
import { useCreateProjectModal } from './use-create-project-modal';

const { open, close, isOpen } = useCreateProjectModal();

<Button onClick={open}>Создать проект</Button>
{isOpen && <CreateProjectModal onClose={close} />}
```

> Хуки не содержат прямых запросов к API, а только управляют состоянием и взаимодействуют с хуками из папки api. 