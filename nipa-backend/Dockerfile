FROM node:20-alpine AS base

FROM base AS builder

RUN apk add --no-cache gcompat
WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./
COPY src ./src
COPY prisma ./prisma

RUN npm install && \
	npm run build && \
	npm prune --production

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 hono

COPY --from=builder --chown=hono:nodejs /app/node_modules /app/node_modules
COPY --from=builder --chown=hono:nodejs /app/dist /app/dist
COPY --from=builder --chown=hono:nodejs /app/package.json /app/package.json
COPY --from=builder --chown=hono:nodejs /app/prisma /app/prisma

USER hono
EXPOSE 8787

CMD ["sh", "-c", "npx prisma generate && npx prisma db push && node /app/dist/index.js"]