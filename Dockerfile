# Base image with Node.js
FROM node:slim AS base
# Using slim for a good balance of size and compatibility.
# Enable Corepack to manage pnpm, which is the recommended way.
RUN corepack enable

# 1. Dependencies Stage: Install dependencies
# This stage is dedicated to installing dependencies to leverage Docker's layer caching.
# It only gets re-run if dependency files (package.json, pnpm-lock.yaml) change.
FROM base AS deps
WORKDIR /app

# Copy only the files required for dependency installation.
# The .npmrc file is optional, but good practice to include if you use it.
COPY .npmrc ./
COPY pnpm-lock.yaml ./
COPY package.json ./

# Install all dependencies. Using --frozen-lockfile ensures CI/CD environments use the exact versions from the lockfile.
RUN pnpm install --frozen-lockfile --prod=false

# 2. Builder Stage: Build the Next.js application
# This stage builds the application using the source code and the installed dependencies.
FROM base AS builder
WORKDIR /app

# Copy installed dependencies from the 'deps' stage first.
COPY --from=deps /app/node_modules ./node_modules

# Then, copy the rest of the source code.
# This ordering improves caching: code changes won't invalidate the node_modules layer.
COPY . .

# Set NODE_ENV to production for an optimized build.
ENV NODE_ENV=production

# Build the Next.js application.
RUN pnpm build

# 3. Runner Stage: Create the final, lean production image
# This stage creates a small, secure image for running the application.
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

# Create a non-root user and group for better security.
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the standalone output, public assets, and static files from the builder stage.
# The Next.js standalone output is self-contained and includes the server and necessary node_modules.
# Ensure the 'nextjs' user owns the files.
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to the non-root user.
USER nextjs
EXPOSE 3001
ENV PORT=3001
ENV HOSTNAME="0.0.0.0"

# The command to start the application.
# This uses the server.js from the standalone output.
CMD ["node", "server.js"]