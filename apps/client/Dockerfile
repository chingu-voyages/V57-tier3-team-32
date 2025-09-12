# Build stage
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm i

# Declare a build argument for the backend URL
ARG VITE_BACKEND_URL

# Set the environment variable using the build argument.
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Create logs directory
RUN mkdir -p /var/log/nginx

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
