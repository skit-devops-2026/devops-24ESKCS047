# Root Dockerfile for Sayso backend service
FROM node:20-alpine

WORKDIR /app

# Copy package files first for layer caching
COPY backend/package*.json ./
RUN npm install

# Copy application source code
COPY backend/ ./

EXPOSE 3000

CMD ["npm", "start"]
