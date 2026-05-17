import type { Summary } from '../types.ts';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const podcastGenerator = {
  async generate(_summaries: Summary[]): Promise<string> {
    await delay(200);
    if (Math.random() < 0.3) {
      throw new Error('Podcast generation failed: upstream AI service unavailable');
    }
    return `https://podcasts.example.com/newsletter-${Date.now()}.mp3`;
  },
};
