FROM node

WORKDIR /app

COPY package.json .

COPY package-lock.json .

COPY .env .

COPY /src .

EXPOSE 3000

CMD [ "npm", "install", "run", "dev" ]