FROM node:20-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./

ENV NODE_ENV production

EXPOSE 3000

CMD ["node", "dist/main.js"]

ARG REGISTRY_URL=ghcr.io/zlr-sashrika

RUN echo $REGISTRY_PASSWORD | docker login ghcr.io -u $REGISTRY_USERNAME --password-stdin 
 && docker tag github-oauth-poc:latest $REGISTRY_URL/github-oauth-poc:latest 
 && docker push $REGISTRY_URL/github-oauth-poc:latest