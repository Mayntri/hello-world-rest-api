FROM node:16-alpine

WORKDIR /usr/src/app

ARG NPM_TOKEN

COPY .npmrc .npmrc

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD [ "node", "src/server.js" ]