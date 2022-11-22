FROM node:14.15.4-alpine3.12

RUN apk add --no-cache bash

RUN rm -rf .docker/dbdata

RUN npm install

USER node

WORKDIR /home/node/app