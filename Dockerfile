# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:14.18-alpine as build

# Set the working directory
WORKDIR /usr/local/app

RUN npm cache clean --force

# Add the source code to app
COPY . .

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build --prod


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest AS ngi

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/StksMessenger /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80