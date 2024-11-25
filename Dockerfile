FROM node:latest

WORKDIR /usr/local/app

COPY package.json ./
RUN yarn install

COPY . .
EXPOSE 3000

# Setup an app user so the container doesn't run as the root user
RUN useradd app

USER app

CMD ["yarn", "run", "next"]