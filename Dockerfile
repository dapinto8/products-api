FROM node:lts-alpine

WORKDIR /usr/src/api
COPY package.json /usr/src/api/

RUN npm install --force

EXPOSE ${PORT}
