FROM node:22.6-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./

RUN --mount=type=cache,target=/root/.cache/yarn \
    yarn install

# stage 2

FROM node:22.6-alpine

WORKDIR /app

COPY --from=build /app /app

EXPOSE 3001

CMD ["sh", "-c", "yarn migration:apply && yarn dev"]