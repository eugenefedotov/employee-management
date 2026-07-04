# Employee Management System

A simple system to manage employees across three offices: Riga, Tallinn, and Vilnius.

Each employee has a first name, last name, office, date of birth, phone number, and a set of positive/negative tags.

Positive and negative tags are two separate, independently editable lists (full CRUD), each with its own color per tag.

## Tech stack

- Frontend: Angular 19, Angular Material
- Backend: NestJS
- Database: MongoDB

## Prerequisites

- Node.js 22, managed with [nvm](https://github.com/nvm-sh/nvm). This repo has a `.nvmrc` file, so just run `nvm use` in the project root.
- Docker (for example [OrbStack](https://orbstack.dev/) or Docker Desktop) - MongoDB runs in a container, no need to install it locally.

## MongoDB setup

```bash
docker compose up -d
```

Starts a MongoDB 8 container on port `27017`, data persists in a Docker volume. Stop it with `docker compose down`.

## Project structure

- `backend/` - NestJS API
- `frontend/` - Angular app

## Backend setup

```bash
cd backend
nvm use
npm install
cp .env.example .env
npm run start:dev
```

The `cp .env.example .env` step is required - without it there's no `MONGODB_URI` and the app won't start. The default value already points at the Mongo container above.

Runs on `http://localhost:3000`. There's a `backend/requests.http` file with ready-made requests for every endpoint (works out of the box in WebStorm/IntelliJ, just click the run arrow next to a request).

## API endpoints

Positive tags (id is a string, generated with `crypto.randomUUID()`):
- `POST /positive-tags` - create, body `{ name, color }`
- `GET /positive-tags` - list all
- `GET /positive-tags/:id` - get one
- `PATCH /positive-tags/:id` - update, same body, all optional
- `DELETE /positive-tags/:id`

Negative tags - same shape, but `id` is an auto-incremented number:
- `POST /negative-tags`, `GET /negative-tags`, `GET /negative-tags/:id`, `PATCH /negative-tags/:id`, `DELETE /negative-tags/:id`

`color` has to be a valid hex color, e.g. `#1D9E75`.

Employees:
- `POST /employees` - body `{ firstName, lastName, office, dateOfBirth, phoneNumber, positiveTagIds?, negativeTagIds? }`. `office` is one of `Riga` / `Tallinn` / `Vilnius`, `dateOfBirth` is an ISO date string like `1990-05-14`.
- `GET /employees`, `GET /employees/:id`, `PATCH /employees/:id` (same fields, all optional), `DELETE /employees/:id`

## Known limitations

`positiveTagIds`/`negativeTagIds` on an employee aren't checked against the actual tags collections when creating/updating - MongoDB doesn't have foreign keys, and since the frontend only lets you pick tags from a dropdown, this was left out on purpose to keep the scope reasonable.

## Frontend setup

```bash
cd frontend
nvm use
npm install
npm start
```

Runs on `http://localhost:4200`. Make sure the backend is running too, since the frontend calls its API.
