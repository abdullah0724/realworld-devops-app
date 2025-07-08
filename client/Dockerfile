<<<<<<< HEAD
FROM node:18
ARG VITE_SERVER_URL
ENV VITE_SERVER_URL=$VITE_SERVER_URL
WORKDIR /client
COPY public/ /client/public
COPY src/ /client/src
COPY index.html /client/
COPY package.json /client/
COPY vite.config.js /client/
RUN npm install
RUN npm run build
=======
# Multi-stage build pipeline

# STAGE 1: Building assets using Node image
# Using nodejs image as starting point
FROM node:16 AS builder
# Setting working directory
WORKDIR /app

# Copying package.json and yarn.lock and installing node modules
# This helps caching the modules
COPY package.json .
COPY yarn.lock .
RUN yarn install

# Copying rest of the file in image's working directory
COPY . .

# set arguements
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Building the assets
RUN yarn build

# STAGE 2: Using nginx to serve the built assets
# Using nginx as a starting point
FROM nginx:alpine
# Setting up working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/dist .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
>>>>>>> ae9cb74d7c82c84d48db87c255853433915edf0a
