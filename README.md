# WorkTask 

WorkTask - это frontend часть приложения для отслеживания задач. Проект предоставляет пользователю интерфейс для создания, просмотра, редактирования и удаления задач. Разработан с использованием React, JavaScript, react-router-dom и node-sass.

Этот проект служит учебной площадкой для начинающих разработчиков, фокусируясь на реализации базовой логики и написании чистого, поддерживаемого кода.
## Начало работы

### Предварительные требования

* Node.js (>= 16.0.0 рекомендуется)
* npm (>= 6.0.0) или yarn (>= 1.0.0)

### Установка

1. Установка Node.js на Windows и macOS. Перейдите на официальный сайт (https://nodejs.org/en/download) и скачайте последнюю стабильную версию с припиской LTS. На сайте есть версии и для Windows, и для macOS
2. Клонируйте репозиторий: git clone https://github.com/WorkTechDevelop/frontend.git
3. Перейдите в директорию проекта: cd work-task-fontend
4. Установите зависимости: npm install

### Запуск 

* npm start
* Приложение запустится в режиме разработки и будет доступно по адресу [http://localhost:3000](http://localhost:3000).

## Структура проекта

Проект состоит из следующих основных директорий и файлов:

### Директории

- **public/**: Содержит статические файлы, такие как `favicon.png` и `index.html`, которые редко используются.
  
- **src/**: Основная директория с исходным кодом приложения.
  
  - **components/**: Содержит основные и часто переиспользуемые компоненты приложения.
  
  - **config/**: Конфигурационные файлы, такие как `api.js`, для работы с API.
  
  - **layout/**: Содержит компоненты и стили для приложения.
    - **Header/**: Компоненты и стили для заголовка.
      - **icons/**: Иконки, используемые в заголовке.
      - `Header.jsx`: Компонент заголовка.
      - `Header.scss`: Стили для заголовка.
    - **HeaderLeftMenu/**: Компоненты и стили для левого меню.
      - `Menu.jsx`: Компонент меню.
      - `Menu.scss`: Стили для меню.
    - `Layout.jsx`: Основной компонент лэйаута.
    - `Layout.scss`: Стили для лэйаута.
  
  - **pages/**: Содержит страницы приложения.
    - **CreateTask/**: Страница для создания задач.
      - `CreateTask.jsx`: Компонент страницы создания задач.
    - **Home/**: Главная страница приложения.
      - `Home.jsx`: Компонент главной страницы.
    - **Login/**: Страница для входа в систему.
      - `Login.jsx`: Компонент страницы входа.
      - `Login.scss`: Стили для страницы входа.
    - **UserProfile/**: Страница профиля пользователя.
      - `UserProfile.jsx`: Компонент страницы профиля пользователя.
  
  - **utils/**: Утилиты и вспомогательные функции.
  
  - `App.js`: Основной компонент приложения.
  - `index.js`: Точка входа в приложение.
  - `index.scss`: Основные используемые стили

### Файлы конфигурации

- **.env**: Файл содержащий настройки для API

- **package.json**: Файл в котором находятся зависимости и скрипты для сборки и запуска проекта

## Тестирование

В настоящее время тесты отсутствуют, но в будущем планируется внедрение UI автотестов с использованием Playwright и TypeScript.

## Планы на будущее

* Интеграция UI автотестов (Playwright + TypeScript)
* Настройка CI/CD пайплайна.
* Выход в продакшен.

## Внесение своего вклада

Мы приветствуем вклад других разработчиков! Пожалуйста, следуйте этим рекомендациям:

* Придерживайтесь стиля кодирования проекта.
* Горячие клавиши для рефакторинга текста в VS code: WIN(Alt + Shift + F), MAC(OPTION + SHIFT + F).
* Создавайте понятные и лаконичные коммиты.
* Перед добавлением новой библиотеки/фреймворка уведомить членов команды.
* Перед тем как создать пулл-реквест соберите проект локально командой npm run build и убедитесь, что нет ошибок.
