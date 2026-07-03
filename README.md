# Employee Management System

A simple system to manage employees across three offices: Riga, Tallinn, and Vilnius.

Each employee has:
- First name
- Last name
- Office
- Date of birth
- Phone number
- Positive tags
- Negative tags

Positive and negative tags are two separate lists. Both support full CRUD (create, read, update, delete). Each tag has a color.

## Tech stack

- **Frontend**: Angular 19, Angular Material
- **Backend**: NestJS
- **Database**: MongoDB

## Prerequisites

- **Node.js 22** (managed with [nvm](https://github.com/nvm-sh/nvm))
  This repo has a `.nvmrc` file. Run `nvm use` in the project root to switch to the correct Node version.
- **Docker** (for example [OrbStack](https://orbstack.dev/), a lightweight Docker Desktop alternative for macOS, or Docker Desktop itself)
  MongoDB runs in a container, so you don't need to install MongoDB on your machine.

## MongoDB setup

Start MongoDB with Docker Compose:

```bash
docker compose up -d
```

This starts a MongoDB 8 container on port `27017`, with data saved in a Docker volume (data stays even if you stop and restart the container).

To stop it:

```bash
docker compose down
```

## Project structure

```
employee-management/
├── backend/    # NestJS API
└── frontend/   # Angular app (coming soon)
```

## Backend setup

```bash
cd backend
nvm use
npm install
npm run start:dev
```

The API will run on `http://localhost:3000`.

## Frontend setup

_Coming soon._

## Status

This project is a work in progress. More sections (API endpoints, environment variables) will be added as the project grows.
