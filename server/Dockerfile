FROM node

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN yarn install 

COPY . .

EXPOSE 6969

CMD [ "yarn", "run", "start" ]