# Multi-stage Dockerfile for Bodega Beam Next.js application
# Uses pnpm for package management and creates optimized production build

# Stage 1: Dependencies
# Installs all dependencies including dev dependencies needed for build
FROM node:lts-alpine AS deps
# Install pnpm package manager
RUN apk add --no-cache pnpm
WORKDIR /app
# Copy package files for deterministic installation
COPY package.json pnpm-lock.yaml ./
# Install with frozen lockfile for reproducible builds
RUN pnpm install --frozen-lockfile

# Stage 2: Builder
# Creates the production build with standalone output
FROM node:lts-alpine AS builder
RUN apk add --no-cache pnpm
WORKDIR /app
# Copy pre-installed node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Build Next.js in standalone mode for minimal runtime image
RUN pnpm build

# Stage 3: Runner
# Minimal production image with only runtime essentials
FROM node:lts-alpine AS runner
WORKDIR /app

# Set production environment
ENV NODE_ENV production
# Default port - can be overridden at runtime
ENV PORT 3000

# Copy only the standalone output - no build tools or source needed
# Standalone output includes its own minimal server
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Run as non-root user for security
USER node
EXPOSE 3000
# Start the standalone Next.js server
CMD ["node", "server.js"]
