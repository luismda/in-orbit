# in.orbit

A web app for managing weekly personal goals developed using React.js, TailwindCSS, Node.js, Fastify, PostgreSQL and Drizzle ORM. 🔥

> ✅ All features have E2E tests.

The Figma layout can be accessed [here](https://www.figma.com/community/file/1415093862269754302/nlw-pocket-js-in-orbit).

## Running

> This project uses [biome](https://github.com/biomejs/biome) for linting. So, you will probably want to install the biome extension in your VSCode.

```sh

# Clone this repository
git clone https://github.com/luismda/in-orbit.git

```

### Server

> Create a `.env` file inside the `server` directory following the `.env.example`. Then run these commands below. 👇

```sh

# Install the dependencies
pnpm i

# Start docker
docker compose up -d

# Run migrations on database
pnpm migrate

# Populate the database with fake data
pnpm seed

# Start project 🚀
pnpm dev

# Run all e2e tests 🔥
pnpm test:e2e

```

### Web

> Create a `.env.local` file inside the `web` directory following the `.env.example`. Then run these commands below. 👇

```sh

# Install the dependencies
pnpm i

# Start project 🚀
pnpm dev

```
