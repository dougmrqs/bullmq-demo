import { Worker } from 'bullmq';
import type { Job } from 'bullmq';
import { QUEUE, redisConnection } from './queues.ts';
import { fetchNews } from './processors/fetch-news.ts';
import { summarizeNews } from './processors/summarize-news.ts';
import { generatePodcast } from './processors/generate-podcast.ts';
import { assembleTemplate } from './processors/assemble-template.ts';
import { newsletterDispatch } from './processors/newsletter-dispatch.ts';
import { deliverNewsletter } from './processors/deliver-newsletter.ts';
import { newsletterCampaign } from './processors/newsletter-campaign.ts';

const processors: Record<string, (job: Job) => Promise<unknown>> = {
  'fetch-news': fetchNews,
  'summarize-news': summarizeNews,
  'generate-podcast': generatePodcast,
  'assemble-template': assembleTemplate,
  'newsletter-dispatch': newsletterDispatch,
  'deliver-newsletter': deliverNewsletter,
  'newsletter-campaign': newsletterCampaign,
};

const worker = new Worker(QUEUE, (job) => {
  const fn = processors[job.name];
  if (!fn) throw new Error(`Unknown job: ${job.name}`);
  return fn(job);
}, { connection: redisConnection, concurrency: 50 });

worker.on('failed', (job, err) => {
  console.error(`[${job?.name}] job ${job?.id} failed: ${err.message}`);
});

console.log(`Worker started. Listening on queue: ${QUEUE}`);
