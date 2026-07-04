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
└── frontend/   # Angular app
```

## Backend setup

```bash
cd backend
nvm use
npm install
cp .env.example .env
npm run start:dev
```

**Important:** the `cp .env.example .env` step is required - without it, the app has no `MONGODB_URI` and will fail to start. The default value already points to the MongoDB container from the step above, so no changes are needed to get started.

The API will run on `http://localhost:3000`.

You can try the endpoints below using the `backend/requests.http` file (works out of the box in WebStorm/IntelliJ - click the run arrow next to each request).

## API endpoints

### Positive tags (`id` is a string)

| Method | Path                  | Body                          |
| ------ | --------------------- | ------------------------------ |
| POST   | `/positive-tags`      | `{ "name": string, "color": string }` |
| GET    | `/positive-tags`      | -                               |
| GET    | `/positive-tags/:id`  | -                               |
| PATCH  | `/positive-tags/:id`  | `{ "name"?: string, "color"?: string }` |
| DELETE | `/positive-tags/:id`  | -                               |

### Negative tags (`id` is a number, auto-generated)

| Method | Path                  | Body                          |
| ------ | --------------------- | ------------------------------ |
| POST   | `/negative-tags`      | `{ "name": string, "color": string }` |
| GET    | `/negative-tags`      | -                               |
| GET    | `/negative-tags/:id`  | -                               |
| PATCH  | `/negative-tags/:id`  | `{ "name"?: string, "color"?: string }` |
| DELETE | `/negative-tags/:id`  | -                               |

`color` must be a valid hex color, for example `#1D9E75`.

### Employees

| Method | Path              | Body |
| ------ | ------------------ | ---- |
| POST   | `/employees`       | `{ "firstName": string, "lastName": string, "office": "Riga" \| "Tallinn" \| "Vilnius", "dateOfBirth": string, "phoneNumber": string, "positiveTagIds"?: string[], "negativeTagIds"?: number[] }` |
| GET    | `/employees`       | -    |
| GET    | `/employees/:id`   | -    |
| PATCH  | `/employees/:id`   | same fields as create, all optional |
| DELETE | `/employees/:id`   | -    |

`dateOfBirth` must be an ISO date string, for example `1990-05-14`.

## Known limitations

- **No referential integrity check on tag IDs.** When creating or updating an employee, `positiveTagIds`/`negativeTagIds` are not checked against the actual tags collections. MongoDB has no foreign key constraints, and since the frontend always picks tags from a dropdown (never free text), this was a deliberate choice to keep the scope focused, not an oversight.

## Frontend setup

```bash
cd frontend
nvm use
npm install
npm start
```

The app will run on `http://localhost:4200`. Make sure the backend (`http://localhost:3000`) is running too, since the frontend calls its API.