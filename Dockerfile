FROM node:18.20-slim

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3001

CMD ["sh", "-c", "yarn migration:apply && yarn dev"]

