# Base image with Node.js
FROM node:slim AS base
# Install pnpm directly instead of using corepack
RUN npm install -g pnpm

# 1. Dependencies Stage: Install dependencies
FROM base AS deps
WORKDIR /app
COPY .npmrc ./
COPY pnpm-lock.yaml ./
COPY package.json ./
RUN pnpm install --frozen-lockfile --prod=false

# 2. Builder Stage: Build the Next.js application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN pnpm build

# 3. Runner Stage: Create the final, lean production image
FROM node:slim AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3001
ENV PORT=3001
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
