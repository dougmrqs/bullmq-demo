import { Worker } from 'bullmq';
import{ QUEUE_NAME, redisConnection } from './config.ts';

function runWorkers() {
  console.log('Starting workers...');

  new Worker(QUEUE_NAME, async (job) => {
    console.log('Processing job:', job.id);
  }, {
    connection:  redisConnection
  });  
}

runWorkers();
