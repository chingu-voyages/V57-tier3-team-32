# Build stage
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm i

# Copy source code
COPY . .

# Build TypeScript to JavaScript
RUN npm run build

# Production stage
FROM node:20-alpine AS production

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm i

# Keep production dependencies only for runtime
RUN npm prune --omit=dev

# Copy built JavaScript files from build stage
COPY --from=build /app/dist ./dist

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
  adduser -S nodejs -u 1001

# Change ownership of app directory
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose the port your app runs on
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/health || exit 1

# Start the application
CMD ["node", "dist/server.js"]
