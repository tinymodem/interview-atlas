import type { MetadataRoute } from 'next';
import { getAllQuestionIds, getJobs } from '@/lib/data';

const baseUrl = 'https://tinymodem.github.io/interview-atlas';
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/zh/`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/en/`, changeFrequency: 'weekly', priority: 0.9 },
  ];

  for (const job of getJobs()) {
    urls.push({ url: `${baseUrl}/zh/jobs/${job.slug}/`, changeFrequency: 'weekly', priority: 0.8 });
    urls.push({ url: `${baseUrl}/en/jobs/${job.slug}/`, changeFrequency: 'weekly', priority: 0.8 });
  }

  for (const id of getAllQuestionIds()) {
    urls.push({ url: `${baseUrl}/zh/q/${id}/`, changeFrequency: 'weekly', priority: 0.7 });
    urls.push({ url: `${baseUrl}/en/q/${id}/`, changeFrequency: 'weekly', priority: 0.7 });
  }

  return urls;
}
