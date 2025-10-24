# syntax=docker/dockerfile:1.7

ARG NODE_VERSION=22-alpine

########################
# Builder
########################
FROM node:${NODE_VERSION} AS builder
WORKDIR /app

# Build-time env (can be overridden by --build-arg)
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_TELEMORA_ADDRESS
ARG NEXT_PUBLIC_SMART_CONTRACT_ADDRESS

# CI-friendly envs
ENV CI=true \
    HUSKY=0 \
    NEXT_TELEMETRY_DISABLED=1 \
    NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL} \
    NEXT_PUBLIC_TELEMORA_ADDRESS=${NEXT_PUBLIC_TELEMORA_ADDRESS} \
    NEXT_PUBLIC_SMART_CONTRACT_ADDRESS=${NEXT_PUBLIC_SMART_CONTRACT_ADDRESS}

# Install deps with cache
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --prefer-offline --no-audit --no-fund

# Build (cache Next compilation artifacts)
COPY . .
RUN --mount=type=cache,target=/app/.next/cache \
    npm run build

########################
# Runtime (standalone)
########################
FROM node:${NODE_VERSION} AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000

# Copy only what’s needed for standalone runtime
# .next/standalone contains server.js and minimal node_modules subset
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Optional: run as non-root (node image has user `node`)
RUN chown -R node:node /app/.next \
    && chown -R node:node /app/public
    
USER node
EXPOSE 3000

# Standalone output entrypoint
CMD ["node", "server.js"]
