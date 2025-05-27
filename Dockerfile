FROM node:24.1-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN --mount=type=cache,target=/root/.cache/yarn \
    yarn install

CMD ["sh", "-c", "until nc -z $NUXT_DB_HOST $NUXT_DB_PORT; do echo 'Waiting for the database...'; sleep 5; done && yarn && yarn migration:apply && yarn dev"]
