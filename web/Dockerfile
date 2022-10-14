FROM node:16-alpine AS build
COPY . /app
WORKDIR /app
RUN yarn install -D
RUN yarn build
ENTRYPOINT ["yarn", "start"]
