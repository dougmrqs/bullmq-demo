import type { Job } from 'bullmq';
import { subscriberRepository } from '../repositories/subscriber-repository.ts';
import { newsletterRepository } from '../repositories/newsletter-repository.ts';
import { emailClient } from '../services/email-client.ts';

export async function deliverNewsletter(job: Job<{ subscriberId: string; newsletterId: string }>): Promise<void> {
  const { subscriberId, newsletterId } = job.data;
  const [subscriber, newsletter] = await Promise.all([
    subscriberRepository.findById(subscriberId),
    newsletterRepository.findById(newsletterId),
  ]);
  await emailClient.send(subscriber, newsletter);
}
