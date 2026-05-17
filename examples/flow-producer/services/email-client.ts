import type { Newsletter, Subscriber } from '../types.ts';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const emailClient = {
  async send(subscriber: Subscriber, newsletter: Newsletter): Promise<void> {
    await delay(Math.floor(Math.random() * 200) + 100);
    const podcastNote = newsletter.podcastUrl ? ' (with podcast)' : ' (no podcast)';
    console.log(`  [email] → ${subscriber.name} <${subscriber.email}>${podcastNote}`);
  },
};
