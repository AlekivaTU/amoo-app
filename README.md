# Amoo App

Приложение для знакомств с функцией геолокации и чата.

## Установка

```bash
# Клонировать репозиторий
git clone https://github.com/AlekivaTU/amoo-app.git

# Перейти в директорию проекта
cd amoo-app

# Установить зависимости
npm install

# Запустить в режиме разработки
npm start
```

## Технологии

- React
- TypeScript
- React Router
- Expo
- GitHub Pages

## Структура проекта

```
amoo-app/
├── src/
│   ├── components/     # React компоненты
│   ├── contexts/       # React контексты
│   ├── services/       # Сервисы API
│   └── styles/         # CSS стили
├── public/            # Статические файлы
└── package.json      # Зависимости и скрипты
```

## Возможности

- 🔐 Безопасная аутентификация и авторизация
- 👥 Создание и редактирование профиля
- 💝 Система лайков и дизлайков
- 💬 Чат с совпадениями
- 📍 Определение местоположения
- 🎥 Стриминг
- 🌓 Поддержка светлой и темной темы
- 📱 Адаптивный дизайн
- 🔄 Офлайн-режим (PWA)

## Тестирование

Запуск тестов:
```bash
npm test
```

Запуск тестов с покрытием:
```bash
npm test -- --coverage
```

## Сборка для продакшена

```bash
npm run build
```

## Деплой

1. Создайте аккаунт на GitHub Pages
2. Настройте репозиторий для GitHub Pages
3. Запустите деплой:
```bash
npm run deploy
```

## Contributing

1. Fork репозитория
2. Создайте ветку для вашей функции (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add some amazing feature'`)
4. Отправьте изменения в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## Лицензия

Этот проект лицензирован под MIT License - см. файл [LICENSE](LICENSE) для деталей.
