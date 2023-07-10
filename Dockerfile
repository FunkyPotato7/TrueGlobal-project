FROM node:18-alpine

MAINTAINER Andrew Buno

RUN mkdir /app
WORKDIR /app

COPY backend/package.json /app

RUN npm i --production