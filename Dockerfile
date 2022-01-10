# STAGE 1
FROM node:16-alpine as builder

WORKDIR /usr/src/app

ARG NODE_AUTH_TOKEN 
ENV NODE_AUTH_TOKEN=$NODE_AUTH_TOKEN

COPY .npmrc ./

COPY tsconfig.json ./

COPY package*.json ./

RUN npm i

COPY . .

RUN npm test && npm run lint

RUN npm run build

# STAGE 2
FROM node:16-alpine

WORKDIR /usr/src/app

ARG NODE_AUTH_TOKEN 
ENV NODE_AUTH_TOKEN=$NODE_AUTH_TOKEN

COPY .npmrc ./

COPY package*.json ./

USER node

RUN npm i --production

COPY --chown=node:node --from=builder /usr/src/app/dist ./dist

EXPOSE 3000

CMD [ "node", "dist/server.js" ]