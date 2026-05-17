import Fastify from 'fastify';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { FastifyAdapter } from '@bull-board/fastify';
import { Queue } from 'bullmq';
import { redisConnection } from '../../config.ts';
import { QUEUE } from '../flow-producer/queues.ts';

const serverAdapter = new FastifyAdapter();
serverAdapter.setBasePath('/ui');

createBullBoard({
  queues: [new BullMQAdapter(new Queue(QUEUE, { connection: redisConnection }))],
  serverAdapter,
  options: { uiConfig: { locale: { lng: 'en-US' } } },
});

const app = Fastify();
app.register(serverAdapter.registerPlugin(), { prefix: '/ui', basePath: '/ui' });

const PORT = 3001;
await app.listen({ port: PORT });
console.log(`Bull Board running at http://localhost:${PORT}/ui`);
