# Bull Board

A web UI for inspecting and managing BullMQ queues in the browser. Powered by [`@bull-board`](https://github.com/felixmosh/bull-board).

## Running

Make sure Redis is running and the queues exist (e.g. run the `flow-producer` example first), then:

```bash
npm run start:bullboard
```

Open `http://localhost:3001/ui` to browse jobs across all registered queues.

## Queues

The board registers the `newsletter-pipeline` queue from the `flow-producer` example. To monitor additional queues, import their constants in `index.ts` and add them to the `queues` array passed to `createBullBoard`.
