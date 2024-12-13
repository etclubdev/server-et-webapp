# Use Node.js LTS version as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application (including src/ for TypeScript files)
COPY . .

# Build the application (TypeScript to JavaScript)
RUN npm run build

# Expose the application port
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
