FROM node:latest

WORKDIR /app

COPY package.json ./
RUN yarn install

COPY . ./app
EXPOSE 3000

# Setup an app user so the container doesn't run as the root user
RUN useradd app
USER app

CMD ["yarn", "run", "dev"]