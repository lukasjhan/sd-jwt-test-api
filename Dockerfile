# Stage 1: Build stage
FROM node:20-alpine

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml tsconfig.json ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application
COPY . ./

EXPOSE 5600

CMD pnpm run prod
