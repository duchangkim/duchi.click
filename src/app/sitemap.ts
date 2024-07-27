import { getAllPosts } from '@/lib/api';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticSitemap: MetadataRoute.Sitemap = [
    {
      url: `${process.env.BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${process.env.BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${process.env.BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const dynamicSitemap: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${process.env.BASE_URL}/posts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'yearly',
    priority: 0.8,
  }));

  return [...staticSitemap, ...dynamicSitemap];
}
