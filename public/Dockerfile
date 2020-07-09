# What image do you want to start building on?
FROM node:14.4.0-alpine

# Tell your container where your app's source code will live
WORKDIR /src/app

COPY package*.json ./

RUN npm install

COPY . .

# What port will the container talk to the outside world with once created?
EXPOSE 3000

# How do you start your app?
CMD [ "npm", "start" ]