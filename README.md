# Calculator
## 1. Задача: https://docs.google.com/document/d/1zpXXeSae-BlcxPKgw3DhxZA92cspVailrPYoaXSYrW8/edit?tab=t.0
## 2. Шаги для сборки и запуска

1. Клонируйте репозиторий с GitHub

2. Перейдите в папку проекта и установите зависимости с помощью ```npm install```

3. Соберите проект с помощью ```npm run build```. В папке проекта появиться папка dist с html и js файлом приложения.

Проект имеет следующую структуру:
```
Calculator/
├── dist/                   # Собранные файлы (HTML и JS)
├── node_modules/           # Модули npm
├── src/                    # Исходный код приложения
│   ├── calculator/               # Логика калькулятора разделена на модули
│   │   ├── calculator.js   # Основной класс калькулятора
│   │   ├── expression.js   # Методы работы с выражением
│   │   ├── evaluator.js    # Токенизация и вычисление
│   │   └── utils.js        # Утилиты (round, экспоненциальное представление и т.д.)
│   ├── keys.js             # Обработчики кнопок
│   ├── theme.js            # Темы и цвета
│   ├── settings.js         # Сохранение и загрузка настроек
│   ├── index.js            # Основной JS файл
│   ├── style.css           # Стили
│   └── index.html          # HTML файл приложения
├── .eslint.config.mjs      # Конфигурация ESLint
├── .prettierrc             # Конфигурация Prettier
├── package.json            # Информация о проекте и зависимости
├── webpack.config.js       # Конфигурация Webpack
└── README.md               # Инструкция по сборке проекта

```
