# Commodity Resources
## _Fish data list, price, and location_

DEMO: https://hungry-northcutt-595200.netlify.app/

## Features
- Crud data hooks
- Serverside rendered with Next.js
- Docker Containerized

## Installation
create.env and copy .env.example data

Development mode.

```sh
npm i
npm run dev
```
or
```sh
npm run dev:clean
```
For production environments...

```sh
npm i
npm run build
npm run start
```

or
```sh
npm run build:clean
npm run start
```

With Docker
```sh
docker-compose build
docker-compose up -d
```

Verify the deployment by navigating to your server address in
your preferred browser.

```sh
http://localhost:9350/
```