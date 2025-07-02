# Stage 1: сборка
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: запуск
FROM nginx:stable-alpine
# Копируем статические файлы
COPY --from=builder /app/.next /usr/share/nginx/html/_next
# Если есть публичные файлы
COPY --from=builder /app/public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf