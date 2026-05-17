import type { Job } from 'bullmq';
import { newsletterRenderer } from '../services/newsletter-renderer.ts';
import { newsletterRepository } from '../repositories/newsletter-repository.ts';

export async function assembleTemplate(job: Job<{ newsletterId: string }>): Promise<{ newsletterId: string }> {
  console.log(`[assemble-template] job ${job.id}`);
  const { newsletterId } = job.data;

  const summaries = newsletterRepository.getSummaries(newsletterId);
  const childValues = await job.getChildrenValues<{ podcastUrl: string }>();
  const podcastUrl = Object.values(childValues)[0]?.podcastUrl ?? null;

  if (podcastUrl) {
    console.log(`[assemble-template] assembling with podcast`);
  } else {
    console.log(`[assemble-template] assembling without podcast (generation failed)`);
  }

  const html = await newsletterRenderer.render(summaries, podcastUrl);
  newsletterRepository.save(newsletterId, html, podcastUrl);
  console.log(`[assemble-template] newsletter ${newsletterId} saved`);
  return { newsletterId };
}
