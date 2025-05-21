import { Worker } from 'bullmq';
import { QUEUE_NAME, redisConnection } from './config.ts';

const processorPath = new URL('./work-processor.ts', import.meta.url).pathname;

function createWorker() {
  return new Worker(QUEUE_NAME, processorPath, {
    connection: redisConnection,
    useWorkerThreads: true,
    concurrency: 42,
  });
}

function runWorkers() {
  console.log('Starting workers...');

  createWorker();
}

runWorkers();
