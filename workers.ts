import { Worker } from 'bullmq';
import{ QUEUE_NAME, redisConnection } from './config.ts';

function runWorkers() {
  console.log('Starting workers...');

  new Worker(QUEUE_NAME, async (job) => {
    console.log('Processing job:', job.id);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Job completed:', job.id);
  }, {
    connection:  redisConnection,
    concurrency: 42
  });
}

runWorkers();
