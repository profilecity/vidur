FROM node:18.20-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install
