import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://theroyalgallerys.com'

  const routes = [
    { url: baseUrl, changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${baseUrl}/heritage`, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/culture`, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/travel`, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/gallery`, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/heritage-ai`, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/journal`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/ecosystem`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/global-vision`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/membership`, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/impact`, changeFrequency: 'monthly' as const, priority: 0.7 },
  ]

  return routes.map(route => ({
    ...route,
    lastModified: new Date(),
  }))
}
