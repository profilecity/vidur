# First stage
FROM node:18.20-alpine as builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

# Second stage
FROM node:18.20-alpine

WORKDIR /app

COPY --from=builder /app .

RUN yarn install --production --frozen-lockfile && yarn cache clean

EXPOSE 3001

CMD ["yarn", "migration:apply", "&&", "yarn", "dev"]
