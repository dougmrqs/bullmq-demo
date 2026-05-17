export type Article = {
  id: string;
  title: string;
  content: string;
};

export type Summary = {
  articleId: string;
  headline: string;
  summary: string;
};

export type Subscriber = {
  id: string;
  name: string;
  email: string;
};

export type Newsletter = {
  id: string;
  html: string;
  podcastUrl: string | null;
  assembledAt: Date;
};
