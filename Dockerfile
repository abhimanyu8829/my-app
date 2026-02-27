# Production-ready Node.js Dockerfile
FROM node:18-alpine

# Set environment to production
ENV NODE_ENV=production

WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./
RUN npm ci --only=production

# Copy application source
COPY . .

# Use non-root user for security
USER node

EXPOSE 3000

CMD ["node", "app.js"]