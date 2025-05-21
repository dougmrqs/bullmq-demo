import { Job } from 'bullmq';

const delay = (ms: number) => {
  const t0 = performance.now();
  while (performance.now() - t0 < ms) {}
}

const asyncDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, 1000));

export default async (job: Job) => {
  console.log('Processing job:', job.id);
  await asyncDelay(5000);
  // delay(5000); 
  console.log('Job completed:', job.id);
}
