import type { Job } from 'bullmq';

export async function newsletterCampaign(job: Job<{ newsletterId: string; subscriberCount: number }>): Promise<void> {
  const { newsletterId, subscriberCount } = job.data;
  const delivered = Object.keys(await job.getChildrenValues()).length;
  const failed = subscriberCount - delivered;

  console.log(`\n[newsletter-campaign] Campaign complete!`);
  console.log(`  Newsletter : ${newsletterId}`);
  console.log(`  Dispatched : ${subscriberCount} subscribers`);
  console.log(`  Delivered  : ${delivered}`);
  if (failed > 0) console.log(`  Failed     : ${failed}`);
}
