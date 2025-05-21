import { Worker } from 'bullmq';
import{ QUEUE_NAME, redisConnection } from './config.ts';
import workProcessor from './work-processor.ts';

function runWorkers() {
  console.log('Starting workers...');

  new Worker(QUEUE_NAME, workProcessor, {
    connection:  redisConnection,
    concurrency: 42,
  });
}

runWorkers();
