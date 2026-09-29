import { MetadataRoute } from 'next'
import { allArticles } from '@/lib/travel-articles'
import { allStyleArticles } from '@/lib/style-articles'
import { getAllEditorialArticles } from '@/lib/editorial/registry'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://theroyalgallerys.com'
  const now = new Date()

  const absImg = (path: string) =>
    path.startsWith('http') ? path : `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`

  const primaryRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: 'weekly', priority: 1, lastModified: now, images: [absImg('/images/hero/jaipur-city-palace-grand-facade.jpg')] },
    { url: `${baseUrl}/style`, changeFrequency: 'weekly', priority: 0.9, lastModified: now, images: [absImg('/images/style/article-07/high-jewellery-gold-luxury.jpg')] },
    { url: `${baseUrl}/travel`, changeFrequency: 'weekly', priority: 0.9, lastModified: now, images: [absImg('/images/badi-mahal-garden-palace-city-palace-udaipur-rajasthan-india.jpg')] },
    { url: `${baseUrl}/travel/the-balmoral`, changeFrequency: 'monthly', priority: 0.85, lastModified: now, images: [absImg('/assets/images/balmoral/balmoral-exterior.jpg')] },
    { url: `${baseUrl}/design`, changeFrequency: 'weekly', priority: 0.9, lastModified: now, images: [absImg('/images/design/varanasi-silk-weaving-traditional-loom.jpg')] },
    { url: `${baseUrl}/culture`, changeFrequency: 'weekly', priority: 0.9, lastModified: now, images: [absImg('/images/culture/indian-royal-art-collections.jpg')] },
    { url: `${baseUrl}/society`, changeFrequency: 'weekly', priority: 0.9, lastModified: now, images: [absImg('/images/society/house-of-mewar-city-palace-udaipur.jpg')] },
    { url: `${baseUrl}/society/portraits-of-heritage`, changeFrequency: 'weekly', priority: 0.85, lastModified: now, images: [absImg('/images/udaipur-city-view-from-hotel-balcony-rajasthan-india.jpg')] },
    { url: `${baseUrl}/society/aaliya-sultana-babi-dinosaur-princess-balasinor`, changeFrequency: 'monthly', priority: 0.95, lastModified: now, images: [absImg('/images/society/aaliya-sultana-babi/01-hero.jpg')] },
    { url: `${baseUrl}/society/shivanjali-kumari-dungarpur-wild-lens-of-royalty`, changeFrequency: 'monthly', priority: 0.95, lastModified: now, images: [absImg('/images/society/shivanjali-kumari-dungarpur/01-hero.jpg')] },
    { url: `${baseUrl}/people`, changeFrequency: 'weekly', priority: 0.9, lastModified: now, images: [absImg('/images/people/raghavendra-rathore-bespoke-atelier.jpg')] },
    { url: `${baseUrl}/motoring`, changeFrequency: 'weekly', priority: 0.9, lastModified: now, images: [absImg('/images/motoring/maharaja-rolls-royce-vintage-collection.jpg')] },
    { url: `${baseUrl}/dining`, changeFrequency: 'weekly', priority: 0.9, lastModified: now, images: [absImg('/images/dining/rajasthani-royal-thali-banquet.jpg')] },
    { url: `${baseUrl}/business`, changeFrequency: 'weekly', priority: 0.9, lastModified: now, images: [absImg('/images/business/mumbai-luxury-skyline-marine-drive.jpg')] },
    { url: `${baseUrl}/royalty`, changeFrequency: 'weekly', priority: 0.9, lastModified: now, images: [absImg('/images/badi-mahal-garden-palace-city-palace-udaipur-rajasthan-india.jpg')] },
    { url: `${baseUrl}/jewellery`, changeFrequency: 'weekly', priority: 0.9, lastModified: now, images: [absImg('/images/style/article-07/high-jewellery-gold-luxury.jpg')] },
    { url: `${baseUrl}/watches`, changeFrequency: 'weekly', priority: 0.9, lastModified: now, images: [absImg('/images/watches/watch-hero.jpeg')] },
    { url: `${baseUrl}/weddings`, changeFrequency: 'weekly', priority: 0.9, lastModified: now, images: [absImg('/images/weddings/article-01/royal-palace-wedding-mandap.jpg')] },
    { url: `${baseUrl}/futures`, changeFrequency: 'weekly', priority: 0.9, lastModified: now, images: [absImg('/images/futures/heritage-ai-digital-preservation.jpg')] },
    { url: `${baseUrl}/archive`, changeFrequency: 'weekly', priority: 0.9, lastModified: now, images: [absImg('/images/hero/jaipur-city-palace-grand-facade.jpg')] },
    { url: `${baseUrl}/journal`, changeFrequency: 'weekly', priority: 0.8, lastModified: now, images: [absImg('/images/hero/jaipur-city-palace-grand-facade.jpg')] },
    { url: `${baseUrl}/ecosystem`, changeFrequency: 'monthly', priority: 0.8, lastModified: now, images: [absImg('/images/hero/jaipur-city-palace-grand-facade.jpg')] },
    { url: `${baseUrl}/global-vision`, changeFrequency: 'monthly', priority: 0.7, lastModified: now, images: [absImg('/images/hero/jaipur-city-palace-grand-facade.jpg')] },
    { url: `${baseUrl}/membership`, changeFrequency: 'weekly', priority: 0.8, lastModified: now, images: [absImg('/images/hero/jaipur-city-palace-grand-facade.jpg')] },
    { url: `${baseUrl}/advertise`, changeFrequency: 'monthly', priority: 0.8, lastModified: now, images: [absImg('/images/hero/jaipur-city-palace-grand-facade.jpg')] },
    { url: `${baseUrl}/impact`, changeFrequency: 'monthly', priority: 0.7, lastModified: now, images: [absImg('/images/hero/jaipur-city-palace-grand-facade.jpg')] },
    { url: `${baseUrl}/image-credits`, changeFrequency: 'monthly', priority: 0.5, lastModified: now },
  ]

  const travelArticleRoutes: MetadataRoute.Sitemap = allArticles.map((article) => ({
    url: `${baseUrl}/travel/${article.slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
    lastModified: new Date(article.publishedDate),
    images: [absImg(article.heroImage)],
  }))

  const styleArticleRoutes: MetadataRoute.Sitemap = allStyleArticles.map((article) => ({
    url: `${baseUrl}/style/${article.slug}`,
    changeFrequency: 'monthly',
    priority: 0.75,
    lastModified: new Date(article.publishedDate),
    images: [absImg(article.heroImage)],
  }))

  const editorialArticleRoutes: MetadataRoute.Sitemap = getAllEditorialArticles().map((article) => ({
    url: `${baseUrl}/${article.section}/${article.slug}`,
    changeFrequency: 'monthly',
    priority: 0.75,
    lastModified: new Date(article.publishedDate),
    images: [absImg(article.heroImage)],
  }))

  return [...primaryRoutes, ...travelArticleRoutes, ...styleArticleRoutes, ...editorialArticleRoutes]
}
