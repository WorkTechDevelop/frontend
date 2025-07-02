# сборка
FROM node:20-alpine AS builder
WORKDIR /app

# копия манифестов и установка prod‑зависимостей
COPY package*.json ./
RUN npm ci

# копирование всего кода и сборка
COPY . .
RUN npm run build

# окружение для запуска
FROM node:20-alpine AS runner
WORKDIR /app

# копирование только того, что нужно для запуска
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# экспорт порта, на котором Next.js слушает
EXPOSE 3000

# запуск в prod‑режиме
CMD ["npm", "run", "start"]
