import type { MetadataRoute } from 'next';
import { getAllQuestionIds, getJobs } from '@/lib/data';
import { getQuestionLastModified, getQuestionPathById, getTopicLastModified, getTopics } from '@/lib/seo';

const baseUrl = 'https://tinymodem.github.io/interview-atlas';
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: 'weekly', priority: 1, lastModified: new Date('2026-03-30T00:00:00.000Z') },
  ];

  for (const job of getJobs()) {
    urls.push({ url: `${baseUrl}/jobs/${job.slug}/`, changeFrequency: 'weekly', priority: 0.8, lastModified: new Date('2026-03-30T00:00:00.000Z') });
  }

  for (const topic of getTopics()) {
    urls.push({ url: `${baseUrl}/topics/${topic.slug}/`, changeFrequency: 'weekly', priority: 0.9, lastModified: getTopicLastModified(topic.slug) });
  }

  for (const id of getAllQuestionIds()) {
    urls.push({ url: `${baseUrl}${getQuestionPathById(id)}/`, changeFrequency: 'weekly', priority: 0.7, lastModified: getQuestionLastModified(id) });
  }

  return urls;
}
