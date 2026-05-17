import { FlowProducer } from 'bullmq';
import type { Job } from 'bullmq';
import { QUEUE, redisConnection } from '../queues.ts';
import { subscriberRepository } from '../repositories/subscriber-repository.ts';

const deliveryFlow = new FlowProducer({ connection: redisConnection });

export async function newsletterDispatch(job: Job<{ newsletterId: string }>): Promise<{ subscriberCount: number }> {
  console.log(`[newsletter-dispatch] job ${job.id}`);
  const { newsletterId } = job.data;

  const subscribers = await subscriberRepository.findActive();
  console.log(`[newsletter-dispatch] dispatching to ${subscribers.length} subscribers`);

  await deliveryFlow.add({
    name: 'newsletter-campaign',
    queueName: QUEUE,
    data: { newsletterId, subscriberCount: subscribers.length },
    children: subscribers.map(subscriber => ({
      name: 'deliver-newsletter',
      queueName: QUEUE,
      data: { subscriberId: subscriber.id, newsletterId },
    })),
  });

  console.log(`[newsletter-dispatch] phase 2 flow created`);
  return { subscriberCount: subscribers.length };
}
