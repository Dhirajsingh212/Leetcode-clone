FROM node:21-alpine

WORKDIR /pubsub

COPY package*.json ./

RUN npm install

COPY . . 

RUN npm run build

EXPOSE 8080

RUN node -v

CMD ["npm", "run","dev"]