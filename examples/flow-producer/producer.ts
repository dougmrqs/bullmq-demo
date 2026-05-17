import { randomUUID } from 'crypto';
import { FlowProducer } from 'bullmq';
import { redisConnection } from './queues.ts';
import { buildNewsletterPipeline } from './flows/newsletter-pipeline.ts';

const newsletterId = randomUUID();
console.log(`Submitting newsletter pipeline`);
console.log(`Newsletter ID: ${newsletterId}`);

const flow = new FlowProducer({ connection: redisConnection });
await flow.add(buildNewsletterPipeline(newsletterId));
await flow.close();
