import type { Article } from '../types.ts';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const newsClient = {
  async fetchArticles(): Promise<Article[]> {
    await delay(150);
    return [
      { id: 'a-1', title: 'AI Reshapes Software Development', content: 'Large language models are fundamentally changing how engineers write and review code.' },
      { id: 'a-2', title: 'Climate Summit Reaches Landmark Agreement', content: 'World leaders signed a new binding framework reducing emissions by 45% before 2035.' },
      { id: 'a-3', title: 'New Framework Simplifies Distributed Systems', content: 'An open-source project promises to cut the complexity of building resilient microservices.' },
      { id: 'a-4', title: 'Space Telescope Reveals Ancient Galaxy', content: 'Astronomers announced the discovery of a galaxy formed just 300 million years after the Big Bang.' },
      { id: 'a-5', title: 'Electric Vehicle Adoption Accelerates', content: 'Global EV sales surpassed internal combustion vehicle sales for the first time last quarter.' },
    ];
  },
};
