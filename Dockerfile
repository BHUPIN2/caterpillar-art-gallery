FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY server.js ./
COPY app.js ./

COPY audit_log.json ./
COPY blogs_log.json ./
COPY orders_log.json ./
COPY portfolio_items.json ./
COPY shop_items.json ./

COPY dist ./dist

EXPOSE 5000

CMD ["npm", "start"]