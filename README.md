# 🚀 Work-Task Frontend

---

## 🏁 Что это такое?
Work-Task — это веб-приложение для управления задачами и проектами.

---

## 📦 Структура проекта

```mermaid
flowchart TD
    A[Начало работы] --> B[Установка зависимостей]
    B --> C[Запуск dev-сервера]
    C --> D[Разработка и тестирование]
    D --> E[Сборка для продакшена]
    E --> F[Деплой на сервер]
    F --> G[Готово!]
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style G fill:#bbf7d0,stroke:#333,stroke-width:2px
```

```mermaid
graph TD
  A[frontend/]
  A1[.github/]
  A2[public/]
  A3[src/]
  A4[tailwind.config.ts]
  A5[next.config.mjs]
  A6[postcss.config.mjs]
  A7[package.json]
  A8[Dockerfile]
  A9[nginx.conf]
  A10[README.md]
  A11[tsconfig.json]
  A --> A1
  A --> A2
  A --> A3
  A --> A4
  A --> A5
  A --> A6
  A --> A7
  A --> A8
  A --> A9
  A --> A10
  A --> A11
  A3 --> B1[app/]
  A3 --> B2[components/]
  A3 --> B3[features/]
  A3 --> B4[lib/]
  A3 --> B5[hooks/]
  A3 --> B6[config.ts]
  style A fill:#f3f4f6,stroke:#333,stroke-width:2px
  style A3 fill:#fef9c3,stroke:#333,stroke-width:2px
  style B1 fill:#bae6fd,stroke:#333,stroke-width:2px
  style B2 fill:#bbf7d0,stroke:#333,stroke-width:2px
  style B3 fill:#fca5a5,stroke:#333,stroke-width:2px
  style B4 fill:#ddd6fe,stroke:#333,stroke-width:2px
  style B5 fill:#fdba74,stroke:#333,stroke-width:2px
  style A10 fill:#f9f,stroke:#333,stroke-width:2px
```

---

## 🧑‍💻 Как начать 

1. **Установите Node.js** (версия >= 20.17.0) и npm (>= 10.8.2). Лучше всего через [nvm](https://github.com/nvm-sh/nvm).
2. Скачайте проект:
   ```bash
   git clone <ссылка на репозиторий>
   cd frontend
   ```
3. Установите зависимости:
   ```bash
   npm install
   ```
4. Запустите проект в режиме разработки:
   ```bash
   npm run dev
   ```
5. Откройте [http://localhost:3000](http://localhost:3000) в браузере.
6. Для продакшена:
   ```bash
   npm run build
   npm start
   ```

---

## 🗂️ Описание структуры

- **.github/** — автоматизация (CI/CD), хранит сценарии для деплоя.
- **public/** — картинки, иконки, логотипы.
- **src/app/** — страницы, роутинг, layout, обработка ошибок, стили.
- **src/components/** — переиспользуемые кусочки интерфейса (кнопки, формы, меню и т.д.).
- **src/features/** — бизнес-логика по разделам: авторизация, проекты, задачи.
- **src/lib/** — вспомогательные функции, типы, утилиты.
- **src/hooks/** — кастомные хуки для React.
- **config.ts** — глобальные настройки.
- **Dockerfile, nginx.conf** — для деплоя в Docker/Kubernetes.
- **package.json** — список зависимостей и команд.
- **README.md** — этот файл!

> В каждой основной папке есть свой README.md с подробностями и примерами.

---

## 🛠️ Основные команды

- `npm run dev` — запуск в режиме разработки
- `npm run build` — сборка для продакшена
- `npm start` — запуск production-сервера
- `npm run lint` — проверка кода на стиль

---

## 🧩 Технологии

- [Next.js 14](https://nextjs.org/) — современный React-фреймворк
- [TypeScript](https://www.typescriptlang.org/) — строгая типизация
- [React Query](https://tanstack.com/query/latest) — кэширование и работа с API
- [Tailwind CSS](https://tailwindcss.com/docs) — стилизация
- [Radix UI](https://www.radix-ui.com/docs/primitives/overview/introduction) — UI-примитивы

---

## 💡 Советы и лучшие практики

- README.md в каждой папке — для упрощения понимания структуры проекта.
- Не храните бизнес-логику в UI-компонентах.
- Для новых API — добавляйте хуки в `features/*/api/`.
- Перед коммитом всегда запускайте `npm run lint`.
- Если что-то не работает — ищите ошибку в терминале, она обычно подсказывает решение.

---

## ❓ FAQ (Частые вопросы)

**Q: Ошибка про Node.js или npm**
A: Проверить версии через `node -v` и `npm -v`. Использовать Node.js >= 20.17.0 и npm >= 10.8.2. Лучше всего — через nvm.

**Q: Не запускается workflow GitHub Actions, пишет про секреты?**
A: Добавьте секреты `SERVER_IP`, `SERVER_USER`, `SSH_PRIVATE_KEY` в Settings → Secrets and variables → Actions.

**Q: Не запускается production-сервер (ошибка .next)?**
A: Выполните `npm run build` перед `npm start`.

**Q: Где искать документацию по отдельным модулям?**
A: В каждой основной папке есть свой README.md с деталями и примерами.

---

**Автор:** @krutakov
