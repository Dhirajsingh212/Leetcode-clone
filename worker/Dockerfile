FROM node:21-alpine

WORKDIR /worker

COPY package*.json ./

RUN npm install

COPY . . 

RUN npm run build

EXPOSE 8001

RUN node -v

CMD ["npm", "run","dev"]