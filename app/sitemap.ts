import { MetadataRoute } from 'next'
import { allArticles } from '@/lib/travel-articles'
import { allStyleArticles } from '@/lib/style-articles'
import { getAllEditorialArticles } from '@/lib/editorial/registry'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://theroyalgallerys.com'
  const now = new Date()

  const primaryRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: 'weekly' as const, priority: 1, lastModified: now },
    { url: `${baseUrl}/style`, changeFrequency: 'weekly' as const, priority: 0.9, lastModified: now },
    { url: `${baseUrl}/travel`, changeFrequency: 'weekly' as const, priority: 0.9, lastModified: now },
    { url: `${baseUrl}/design`, changeFrequency: 'weekly' as const, priority: 0.9, lastModified: now },
    { url: `${baseUrl}/culture`, changeFrequency: 'weekly' as const, priority: 0.9, lastModified: now },
    { url: `${baseUrl}/society`, changeFrequency: 'weekly' as const, priority: 0.9, lastModified: now },
    { url: `${baseUrl}/people`, changeFrequency: 'weekly' as const, priority: 0.9, lastModified: now },
    { url: `${baseUrl}/motoring`, changeFrequency: 'weekly' as const, priority: 0.9, lastModified: now },
    { url: `${baseUrl}/dining`, changeFrequency: 'weekly' as const, priority: 0.9, lastModified: now },
    { url: `${baseUrl}/business`, changeFrequency: 'weekly' as const, priority: 0.9, lastModified: now },
    { url: `${baseUrl}/royalty`, changeFrequency: 'weekly' as const, priority: 0.9, lastModified: now },
    { url: `${baseUrl}/jewellery`, changeFrequency: 'weekly' as const, priority: 0.9, lastModified: now },
    { url: `${baseUrl}/watches`, changeFrequency: 'weekly' as const, priority: 0.9, lastModified: now },
    { url: `${baseUrl}/weddings`, changeFrequency: 'weekly' as const, priority: 0.9, lastModified: now },
    { url: `${baseUrl}/futures`, changeFrequency: 'weekly' as const, priority: 0.9, lastModified: now },
    { url: `${baseUrl}/archive`, changeFrequency: 'weekly' as const, priority: 0.9, lastModified: now },
    { url: `${baseUrl}/journal`, changeFrequency: 'weekly' as const, priority: 0.8, lastModified: now },
    { url: `${baseUrl}/ecosystem`, changeFrequency: 'monthly' as const, priority: 0.8, lastModified: now },
    { url: `${baseUrl}/global-vision`, changeFrequency: 'monthly' as const, priority: 0.7, lastModified: now },
    { url: `${baseUrl}/membership`, changeFrequency: 'weekly' as const, priority: 0.8, lastModified: now },
    { url: `${baseUrl}/impact`, changeFrequency: 'monthly' as const, priority: 0.7, lastModified: now },
  ]

  const travelArticleRoutes: MetadataRoute.Sitemap = allArticles.map((article) => ({
    url: `${baseUrl}/travel/${article.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    lastModified: new Date(article.publishedDate),
  }))

  const styleArticleRoutes: MetadataRoute.Sitemap = allStyleArticles.map((article) => ({
    url: `${baseUrl}/style/${article.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
    lastModified: new Date(article.publishedDate),
  }))

  const editorialArticleRoutes: MetadataRoute.Sitemap = getAllEditorialArticles().map((article) => ({
    url: `${baseUrl}/${article.section}/${article.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
    lastModified: new Date(article.publishedDate),
  }))

  return [...primaryRoutes, ...travelArticleRoutes, ...styleArticleRoutes, ...editorialArticleRoutes]
}
