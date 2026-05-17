import type { Newsletter, Summary } from '../types.ts';

const summariesStore = new Map<string, Summary[]>();
const newsletterStore = new Map<string, Newsletter>();

export const newsletterRepository = {
  saveSummaries(newsletterId: string, summaries: Summary[]): void {
    summariesStore.set(newsletterId, summaries);
  },

  getSummaries(newsletterId: string): Summary[] {
    const summaries = summariesStore.get(newsletterId);
    if (!summaries) throw new Error(`Summaries not found for newsletter ${newsletterId}`);
    return summaries;
  },

  save(newsletterId: string, html: string, podcastUrl: string | null): Newsletter {
    const newsletter: Newsletter = { id: newsletterId, html, podcastUrl, assembledAt: new Date() };
    newsletterStore.set(newsletterId, newsletter);
    return newsletter;
  },

  findById(newsletterId: string): Newsletter {
    const newsletter = newsletterStore.get(newsletterId);
    if (!newsletter) throw new Error(`Newsletter not found: ${newsletterId}`);
    return newsletter;
  },
};
