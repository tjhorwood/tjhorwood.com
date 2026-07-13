# Base image with Node.js
FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@10.30.3 --activate

# 1. Dependencies Stage: Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat curl
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 2. Builder Stage: Build the Next.js application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN apk add --no-cache curl
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_DISABLE_SWC_NATIVE=1

RUN pnpm build

# 3. Runner Stage: Create the final, lean production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOST=0.0.0.0
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

RUN mkdir -p /app/public/media && chown -R nextjs:nodejs /app/public/media

USER nextjs

EXPOSE 3000
CMD ["node", "server.js"]
