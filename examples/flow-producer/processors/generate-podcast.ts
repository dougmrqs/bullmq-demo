import type { Job } from 'bullmq';
import { podcastGenerator } from '../services/podcast-generator.ts';
import { newsletterRepository } from '../repositories/newsletter-repository.ts';

export async function generatePodcast(job: Job<{ newsletterId: string }>): Promise<{ podcastUrl: string }> {
  console.log(`[generate-podcast] job ${job.id} attempt ${job.attemptsMade + 1}`);
  // summarize-news returns only { summaryCount } to keep job payloads small;
  // the full summaries are persisted to the repository as a side effect instead.
  const summaries = newsletterRepository.getSummaries(job.data.newsletterId);
  const podcastUrl = await podcastGenerator.generate(summaries);
  console.log(`[generate-podcast] generated: ${podcastUrl}`);
  return { podcastUrl };
}
