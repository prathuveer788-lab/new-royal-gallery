import { MetadataRoute } from 'next'
import { getPublishedBlogs } from '@/lib/blogs/store'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://theroyalgallerys.com'
  const now = new Date()

  const absImg = (path: string) =>
    path.startsWith('http') ? path : `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: 'weekly', priority: 1, lastModified: now, images: [absImg('/images/hero/jaipur-city-palace-grand-facade.jpg')] },
    { url: `${baseUrl}/blogs`, changeFrequency: 'daily', priority: 0.9, lastModified: now, images: [absImg('/images/hero/jaipur-city-palace-grand-facade.jpg')] },
    { url: `${baseUrl}/ecosystem`, changeFrequency: 'monthly', priority: 0.8, lastModified: now, images: [absImg('/images/hero/jaipur-city-palace-grand-facade.jpg')] },
    { url: `${baseUrl}/global-vision`, changeFrequency: 'monthly', priority: 0.7, lastModified: now, images: [absImg('/images/hero/jaipur-city-palace-grand-facade.jpg')] },
    { url: `${baseUrl}/membership`, changeFrequency: 'weekly', priority: 0.8, lastModified: now, images: [absImg('/images/hero/jaipur-city-palace-grand-facade.jpg')] },
    { url: `${baseUrl}/advertise`, changeFrequency: 'monthly', priority: 0.8, lastModified: now, images: [absImg('/images/hero/jaipur-city-palace-grand-facade.jpg')] },
    { url: `${baseUrl}/impact`, changeFrequency: 'monthly', priority: 0.7, lastModified: now, images: [absImg('/images/hero/jaipur-city-palace-grand-facade.jpg')] },
  ]

  const blogRoutes: MetadataRoute.Sitemap = (await getPublishedBlogs()).map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
    lastModified: new Date(blog.updatedAt),
    images: blog.coverImage ? [absImg(blog.coverImage)] : undefined,
  }))

  return [...staticRoutes, ...blogRoutes]
}
