# Stage 1: Build
FROM node:lts-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve
FROM node:lts-alpine AS runner
USER node
WORKDIR /app
COPY --from=builder /app/.next ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
RUN npm ci --omit=dev
EXPOSE 3000
CMD ["npm", "run", "start"]
