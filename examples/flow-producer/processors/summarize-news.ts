import type { Job } from 'bullmq';
import { aiClient } from '../services/ai-client.ts';
import { newsletterRepository } from '../repositories/newsletter-repository.ts';
import type { Article } from '../types.ts';

export async function summarizeNews(job: Job<{ newsletterId: string }>): Promise<{ summaryCount: number }> {
  console.log(`[summarize-news] job ${job.id}`);
  const childValues = await job.getChildrenValues<Article[]>();
  const articles = Object.values(childValues).flat();
  const summaries = await aiClient.summarize(articles);
  newsletterRepository.saveSummaries(job.data.newsletterId, summaries);
  console.log(`[summarize-news] summarized ${summaries.length} articles → saved to repository`);
  return { summaryCount: summaries.length };
}
