FROM node:18.13.0-alpine

COPY . /app

WORKDIR /app

RUN yarn build

EXPOSE 80