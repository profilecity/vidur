FROM node:18.20-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN --mount=type=cache,target=/root/.cache/yarn \
    yarn install

CMD ["sh", "-c", "yarn migration:apply && yarn dev"]