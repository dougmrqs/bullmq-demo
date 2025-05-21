import Fastify from 'fastify';
import { Queue } from 'bullmq';
import { QUEUE_NAME, redisConnection } from './config.ts';

const queue = new Queue(QUEUE_NAME, { connection: redisConnection });

function buildServer() {
  const fastify = Fastify();

  fastify.get('/', async () => {
    console.log('Request received');
    
    console.log('Enqueuing a job');
    queue.add('my-job', {});

    return { message: 'hello world' };
  });

  fastify.listen({ port: 3000 }, (_, address) => {
    console.log(`Server is listening on ${address}`);
  });
}

buildServer();
