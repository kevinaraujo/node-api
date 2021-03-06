FROM node:12

WORKDIR /usr/app

COPY src/package.json .

RUN npm install

COPY . .

EXPOSE 3000 

CMD [ "npm", "start", "--prefix src/" ]