import Fastify from 'fastify';
import { Queue, Worker } from 'bullmq';

const QUEUE_NAME = 'my-queue';
const redisConnection = {
  host: 'localhost',
  port: 6379,
}

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

function runWorkers() {
  new Worker('my-queue', async (job) => {
    console.log('Processing job:', job.id);
  }, {
    connection:  redisConnection
  });  
}

buildServer();
runWorkers();
