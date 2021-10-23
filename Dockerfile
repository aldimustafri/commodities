FROM node:14-alpine 

RUN mkdir -p /usr/src/app/commodities

WORKDIR /usr/src/app/commodities

COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build


# Expose the listening port
EXPOSE 9350

CMD [ "npm", "start"]

