FROM node:lts

# Set the working directory inside the container
WORKDIR /workspace/front

# Copy only the package.json and package-lock.json first
COPY package*.json ./

# Install both production and development dependencies
RUN npm install --production=false

# Copy the rest of the files
COPY . .

# Build the app
RUN npm run build

# Expose the desired port
EXPOSE 4000

# Set the entrypoint command to start the app
ENTRYPOINT ["npm", "start"]
