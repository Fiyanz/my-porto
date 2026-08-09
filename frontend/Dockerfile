FROM node:20-alpine

WORKDIR /app

# Copy package info
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source
COPY . .

# Build the Next.js app for production
RUN npm run build

# Expose port
EXPOSE 3000

# Start command (Production)
CMD ["npm", "start"]
