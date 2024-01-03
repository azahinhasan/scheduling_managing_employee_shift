# Pull the Node image from Docker Hub
FROM node:16.17.0-alpine3.16

# Setting Working Directory
WORKDIR /app

# Copying only package.json
COPY package*.json ./

# Install Dependencies
RUN npm ci

# Copy rest of the code to container
COPY . ./

EXPOSE 5003

# Run the API on Nodemon
CMD ["npm", "start"]