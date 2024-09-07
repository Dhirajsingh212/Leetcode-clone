FROM node:21-alpine

WORKDIR /express-backend

COPY package*.json ./

RUN npm install

COPY . . 

RUN npm run build

EXPOSE 8000

RUN node -v

CMD ["npm", "run","dev"]