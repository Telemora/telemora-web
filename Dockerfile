FROM node:lts-alpine AS builder
WORKDIR /app
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_TELEMORA_ADDRESS
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_TELEMORA_ADDRESS=${NEXT_PUBLIC_TELEMORA_ADDRESS}
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:lts-alpine AS runner
USER node
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "run", "start"]
