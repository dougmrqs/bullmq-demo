# BullMQ demonstration

This repository shows a few strategies to use BullMQ Workers. It goes through the following worker configurations:

- Simple Worker in the server's process
- Simple Worker in a separate process
- Local Concurrency Factor
- Sandboxed Worker with worker threads
- Sandboxed Worker with child processes

> **TIP: I recommend you to navigate the commit history to follow the evolution of the worker settings.**

## Instructions

(after cloning the repository)

0. Make sure you have the correct NodeJS version. I'm using `v23.10.0` and ASDF to manage NodeJS versions. If you are as well, you can use the following command to install the correct version:

```bash
asdf install
```

1. Install dependencies:

```bash
npm install
```

2. Run the infrastructure and the server:

```bash
docker compose up -d

npm start
```

3. Run the workers

```bash
npm run workers
```

or

```bash
npm run workers:sandboxed
```

4. If you want to reset the database, you can run:

```bash
npm run docker:reset
```
