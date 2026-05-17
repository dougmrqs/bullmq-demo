import { QUEUE } from '../queues.ts';

export function buildNewsletterPipeline(newsletterId: string) {
  return {
    name: 'newsletter-dispatch',
    queueName: QUEUE,
    data: { newsletterId },
    children: [
      {
        name: 'assemble-template',
        queueName: QUEUE,
        data: { newsletterId },
        children: [
          {
            name: 'generate-podcast',
            queueName: QUEUE,
            data: { newsletterId },
            opts: {
              ignoreDependencyOnFailure: true,
              attempts: 2,
            },
            children: [
              {
                name: 'summarize-news',
                queueName: QUEUE,
                data: { newsletterId },
                children: [
                  {
                    name: 'fetch-news',
                    queueName: QUEUE,
                    data: { newsletterId },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
}
