# Use the official Node.js image as the base image for the build stage
FROM node:14 as build
# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the application's dependencies
RUN npm ci

# Copy the rest of the application's files to the container
COPY . .

# Build the React application
RUN npm run build

# Use the official NGINX image as the base image for the production stage
FROM nginx:latest

# Copy the built React application from the build stage to the production stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy the NGINX configuration file to the production stage
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port that the application will run on
EXPOSE 80

# Start the NGINX server
CMD ["nginx", "-g", "daemon off;"]
