import type { Subscriber } from '../types.ts';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const FIRST_NAMES = ['Alice', 'Bob', 'Carol', 'David', 'Eve', 'Frank', 'Grace', 'Hank', 'Ivy', 'Jack'];
const LAST_NAMES = ['Johnson', 'Smith', 'White', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson'];

const subscribers: Subscriber[] = Array.from({ length: 300 }, (_, i) => {
  const first = FIRST_NAMES[i % FIRST_NAMES.length];
  const last = LAST_NAMES[Math.floor(i / FIRST_NAMES.length) % LAST_NAMES.length];
  const n = i + 1;
  return { id: `sub-${n}`, name: `${first} ${last}`, email: `${first.toLowerCase()}.${last.toLowerCase()}.${n}@example.com` };
});

export const subscriberRepository = {
  async findActive(): Promise<Subscriber[]> {
    await delay(100);
    return subscribers;
  },

  async findById(id: string): Promise<Subscriber> {
    await delay(50);
    const subscriber = subscribers.find(s => s.id === id);
    if (!subscriber) throw new Error(`Subscriber not found: ${id}`);
    return subscriber;
  },
};
