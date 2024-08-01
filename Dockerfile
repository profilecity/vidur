FROM node:18.20-slim

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN cp .env.example .env

# check  .env file uses the provided env variables
RUN sed -i 's/localhost/db/' .env

EXPOSE 3001

CMD ["sh", "-c", "yarn migration:apply && yarn dev"]
