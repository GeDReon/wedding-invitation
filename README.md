# 💍 Wedding Invitation — Премиальный сайт-приглашение

Luxury wedding invitation site на **Next.js 15**, **React 19**, **TypeScript**, **TailwindCSS**, **shadcn/ui**, **Framer Motion** с сохранением RSVP-ответов в **Google Sheets** через **Google Apps Script**.

---

## ✨ Возможности

- Премиальный mobile-first дизайн (Apple / Dior / Cartier aesthetic)
- Hero, приглашение, родители, дата, countdown, локация, RSVP
- Валидация формы (Zod + React Hook Form)
- Защита от повторных отправок (LocalStorage)
- Google Sheets интеграция без базы данных
- Фоновая музыка, падающие лепестки, loading screen
- SEO, Open Graph, favicon, 404 страница
- Framer Motion анимации и scroll effects

---

## 🚀 Быстрый старт

### 1. Установка

```bash
cd wedding-invitation
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

### 2. Настройка данных свадьбы

Все тексты, имена, даты и локация — в одном файле:

```
lib/wedding-config.ts
```

Измените:
- Имена жениха и невесты
- Родителей
- Дату и время (`date.iso` — ISO формат для countdown)
- Адрес и ссылку на Google Maps
- Текст приглашения
- SEO метаданные и URL сайта

### 3. Фото Hero

По умолчанию используется Unsplash. Замените URL в `weddingConfig.hero.image` или положите своё фото в `public/images/hero.jpg` и укажите `/images/hero.jpg`.

### 4. Музыка

Положите MP3-файл в:

```
public/music/wedding.mp3
```

Кнопка включения/выключения — правый нижний угол экрана.

---

## 📊 Подключение Google Sheets

### Шаг 1 — Создайте таблицу

1. Откройте [Google Sheets](https://sheets.google.com)
2. Создайте новую таблицу (например, «Wedding RSVP»)
3. Переименуйте первый лист в **RSVP** (или измените `SHEET_NAME` в скрипте)

### Шаг 2 — Apps Script

1. В таблице: **Extensions → Apps Script**
2. Удалите код по умолчанию
3. Скопируйте содержимое файла:

```
google-apps-script/Code.gs
```

4. Сохраните проект (Ctrl+S)

### Шаг 3 — Деплой Web App

1. **Deploy → New deployment**
2. Тип: **Web app**
3. Настройки:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Нажмите **Deploy**
5. Разрешите доступ к Google Account
6. **Скопируйте URL** вида:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

### Шаг 4 — Переменные окружения

Создайте или отредактируйте `.env.local`:

```env
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Перезапустите dev-сервер:

```bash
npm run dev
```

### Структура таблицы

| Дата | Имя | Фамилия | Телефон | Приду | С супругом | Количество | Комментарий | UserAgent | Язык браузера |
|------|-----|---------|---------|-------|------------|------------|-------------|-----------|---------------|

Заголовки создаются автоматически при первой отправке.

### Формат отправляемого JSON

```json
{
  "firstName": "",
  "lastName": "",
  "phone": "",
  "attendance": "yes",
  "withPartner": "no",
  "guests": "2",
  "comment": "",
  "createdAt": "2026-07-29T12:00:00.000Z",
  "userAgent": "",
  "language": "ru-RU"
}
```

> **Примечание:** используется `Content-Type: text/plain` для надёжной работы с Google Apps Script без CORS preflight.

---

## 🌐 Деплой на Vercel

### 1. GitHub

```bash
git init
git add .
git commit -m "Wedding invitation site"
git remote add origin https://github.com/YOUR_USERNAME/wedding-invitation.git
git push -u origin main
```

### 2. Vercel

1. Зайдите на [vercel.com](https://vercel.com)
2. **Add New Project** → импортируйте репозиторий
3. Framework Preset: **Next.js**
4. Environment Variables:
   ```
   NEXT_PUBLIC_GOOGLE_SCRIPT_URL = ваш URL Apps Script
   ```
5. **Deploy**

### 3. Обновите SEO

В `lib/wedding-config.ts` измените `seo.siteUrl` на ваш Vercel URL:

```ts
siteUrl: "https://your-wedding.vercel.app",
```

---

## 📁 Структура проекта

```
wedding-invitation/
├── app/
│   ├── layout.tsx          # Layout, шрифты, SEO
│   ├── page.tsx            # Главная страница
│   ├── not-found.tsx       # 404
│   ├── icon.tsx            # Favicon
│   └── globals.css         # Стили и анимации
├── components/
│   ├── Hero.tsx
│   ├── Invitation.tsx
│   ├── Parents.tsx
│   ├── DateSection.tsx
│   ├── Countdown.tsx
│   ├── Location.tsx
│   ├── RSVP.tsx
│   ├── Footer.tsx
│   ├── MusicPlayer.tsx
│   ├── Petals.tsx
│   ├── LoadingScreen.tsx
│   └── ui/                 # shadcn/ui компоненты
├── lib/
│   ├── wedding-config.ts   # ← Все данные свадьбы
│   ├── googleSheets.ts     # Отправка RSVP
│   ├── rsvp-schema.ts      # Zod валидация
│   └── utils.ts
├── google-apps-script/
│   └── Code.gs             # Apps Script для Sheets
├── public/
│   └── music/
│       └── wedding.mp3     # ← Добавьте свой файл
├── .env.local              # URL Apps Script
└── README.md
```

---

## 🔒 RSVP — логика и защита

### Валидация
- Имя и фамилия — обязательны, минимум 2 символа
- Телефон — необязателен
- Количество гостей — от 1 до 10 (только если «Да»)
- Trim, запрет HTML и script-тегов

### Если гость выбрал «Нет»
- Скрываются: супруг, количество, комментарий
- Отправляется: `guests: "0"`, `withPartner: "no"`

### Защита от повторных отправок
- Кнопка блокируется + loader во время отправки
- После успеха — запись в `localStorage`
- При повторном визите — «Вы уже подтвердили участие»
- Очистка истории браузера / другой device — можно отправить снова

---

## 🛠 Команды

```bash
npm run dev      # Разработка
npm run build    # Production сборка
npm run start    # Запуск production
npm run lint     # ESLint
```

---

## 🎨 Кастомизация дизайна

Цвета настраиваются в `tailwind.config.ts`:

- `cream` — кремовый
- `beige` — бежевый
- `gold` — золотой
- `wedding.*` — основная палитра

---

## ❓ FAQ

**RSVP не отправляется?**
- Проверьте `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` в `.env.local`
- Убедитесь, что Web App задеплоен с доступом «Anyone»
- После изменения Apps Script — создайте **New deployment** (не Edit)

**Музыка не играет?**
- Добавьте `public/music/wedding.mp3`
- На iOS музыка включается только после нажатия кнопки (ограничение браузера)

**Countdown показывает нули?**
- Проверьте `date.iso` в `wedding-config.ts` — дата должна быть в будущем

---

С любовью создано для вашего особенного дня ❤️
