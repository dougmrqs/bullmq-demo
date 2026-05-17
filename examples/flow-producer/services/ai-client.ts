import type { Article, Summary } from '../types.ts';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const aiClient = {
  async summarize(articles: Article[]): Promise<Summary[]> {
    await delay(300);
    return articles.map(article => ({
      articleId: article.id,
      headline: article.title,
      summary: article.content.slice(0, 80) + '...',
    }));
  },
};
