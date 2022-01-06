FROM node:16-alpine

WORKDIR /usr/src/app

ARG NODE_AUTH_TOKEN 
ENV NODE_AUTH_TOKEN=$NODE_AUTH_TOKEN

COPY .npmrc.docker .npmrc

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD [ "node", "src/server.js" ]