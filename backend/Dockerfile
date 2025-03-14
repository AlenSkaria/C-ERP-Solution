# Stage 1: Build the application
FROM node:18-alpine 

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application source code
COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]