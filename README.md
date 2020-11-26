# PixowlGram » NodeJS Backend

![Lint & Test](https://github.com/fischettij/pixowlgram/workflows/Lint%20&%20Test/badge.svg?branch=release-candidate)

## TL;DR

```sh
git clone https://github.com/fischettij/pixowlgram.git
cd pixowlgram
npm i
npx sequelize db:migrate
npm run start
```

or

```sh
git clone https://github.com/fischettij/pixowlgram.git
cd pixowlgram
docker-compose up
```

## Install & Run

### Download

```sh
git clone https://github.com/fischettij/pixowlgram.git
cd pixowlgram
```

### Install

```sh
npm i
```

### Run Migrations

```sh
npx sequelize db:migrate
```

### Start

```sh
npm run start
```

### TODO

- Token expires
- Refresh token
- Save images in storage service
- Login with third party
- CD: Github Actions + DigitalOcean
- Test upload path
- Path for likes
