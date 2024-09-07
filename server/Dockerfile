FROM node:21-alpine

# Create app directory
WORKDIR /server


COPY package*.json ./

RUN npm install

COPY . . 

RUN npx prisma generate

RUN npm run build


EXPOSE 8000

RUN node -v

CMD ["npm", "run","dev"]