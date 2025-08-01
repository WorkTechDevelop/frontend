# src/app/(dashboard)

Основной раздел приложения после авторизации.

## Структура
- **page.tsx** — главная страница дашборда с разным контентом для разных ролей
- **admin/** — административная панель (только для админов)
- **projects/** — управление проектами (кроме админов)
- **tasks/** — управление задачами (кроме админов)
- **settings/** — настройки пользователя
- **users/** — управление пользователями (только для админов)

## Ролевая модель

### Администратор
Видит на главной:
- Управление пользователями (переход в админ панель)
- Список пользователей
- Общие элементы интерфейса

Доступ к разделам:
- /admin — административная панель
- /users — управление пользователями
- /settings — общие настройки

### Руководитель проекта и участники
Видят на главной:
- Мои проекты
- Мои задачи
- Создание проекта (только для руководителей)
- Создание задачи
- Общие элементы интерфейса

Доступ к разделам:
- /projects — управление проектами
- /tasks — управление задачами
- /settings — общие настройки

## Оптимизация
- API запросы выполняются с учетом роли пользователя
- Ненужные запросы блокируются на уровне хуков
- Компоненты рендерятся условно в зависимости от роли

## Безопасность
- Проверка прав доступа на уровне страниц
- Проверка прав доступа на уровне компонентов
- Проверка прав доступа на уровне API запросов
- Редиректы при отсутствии прав 