import type { Job } from 'bullmq';
import { newsClient } from '../services/news-client.ts';
import type { Article } from '../types.ts';

export async function fetchNews(job: Job<{ newsletterId: string }>): Promise<Article[]> {
  console.log(`[fetch-news] job ${job.id}`);
  const articles = await newsClient.fetchArticles();
  console.log(`[fetch-news] fetched ${articles.length} articles`);
  return articles;
}
