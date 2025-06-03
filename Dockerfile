# Сборка Vite-приложения
FROM node:23.11.0 AS builder

WORKDIR /app

COPY client ./client
COPY client/package*.json ./client/

RUN cd client && npm install && npm run build

# Сервер
FROM node:23.11.0

WORKDIR /app

COPY server ./server
COPY server/package*.json ./server/

RUN cd server && npm install

# Копируем билд клиента внутрь Express-сервера
COPY --from=builder /app/client/dist ./server/public/dist

WORKDIR /app/server

EXPOSE 3000

# Запуск сервера
CMD ["npm", "run", "start"]
