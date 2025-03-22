# Amoo Dating App

Веб-приложение для знакомств с современным интерфейсом и расширенным функционалом.

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

## Технологии

- React
- TypeScript
- React Router
- Context API
- Service Workers
- Workbox
- Jest
- Testing Library

## Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/yourusername/amoo-web-cra.git
cd amoo-web-cra
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте файл `.env` в корневой директории и добавьте необходимые переменные окружения:
```env
REACT_APP_API_URL=https://api.amoo.app
REACT_APP_SOCKET_URL=wss://socket.amoo.app
```

4. Запустите приложение в режиме разработки:
```bash
npm start
```

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

## Структура проекта

```
amoo-web-cra/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── service-worker.js
├── src/
│   ├── components/
│   │   ├── DatingScreen/
│   │   ├── ProfileScreen/
│   │   ├── ChatScreen/
│   │   └── ...
│   ├── contexts/
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── services/
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   └── datingService.ts
│   ├── styles/
│   │   └── themes.css
│   ├── App.tsx
│   └── index.tsx
├── package.json
└── README.md
```

## Contributing

1. Fork репозитория
2. Создайте ветку для вашей функции (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add some amazing feature'`)
4. Отправьте изменения в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## Лицензия

Этот проект лицензирован под MIT License - см. файл [LICENSE](LICENSE) для деталей.
