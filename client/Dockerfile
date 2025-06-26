# client/Dockerfile.dev
FROM node:23-alpine
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy the source code
COPY . .

# Expose the port (default Vite dev server port is 5173)
EXPOSE 5173

# Run the development server with hot reloading.
CMD ["npm", "run", "dev"]