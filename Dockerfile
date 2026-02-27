FROM node:18-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

# Fix ownership for node user
RUN chown -R node:node /app

USER node

EXPOSE 3000

CMD ["node", "app.js"]