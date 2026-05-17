import type { Summary } from '../types.ts';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const newsletterRenderer = {
  async render(summaries: Summary[], podcastUrl: string | null): Promise<string> {
    await delay(100);
    const podcastSection = podcastUrl
      ? `<section class="podcast"><h2>This Week's Podcast</h2><a href="${podcastUrl}">Listen Now</a></section>`
      : '';
    const articles = summaries
      .map(s => `<article><h3>${s.headline}</h3><p>${s.summary}</p></article>`)
      .join('\n');
    return `<!DOCTYPE html><html><body>${podcastSection}<main>${articles}</main></body></html>`;
  },
};
