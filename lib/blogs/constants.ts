export const BLOG_CATEGORIES = [
  "Style",
  "Jewellery",
  "Watches",
  "Weddings",
  "Travel",
  "UK",
  "Design",
  "Culture",
  "Royalty",
  "Society",
  "Motoring",
  "Dining",
  "Business",
  "Future",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const SOCIETY_SUBCATEGORIES = [
  "Society Overview",
  "Portraits of Heritage",
  "The Dinosaur Princess Profile",
  "Wild Lens of Royalty Profile",
] as const;

export const BLOG_FORMATS = [
  "Profile",
  "Feature",
  "Essay",
  "Review",
  "Investigation",
  "Dispatch",
] as const;

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: BlogCategory;
  subcategory: string;
  format: string;
  readTime: string;
  authorName: string;
  coverImage: string;
  content: string;
  featuredOnHome: boolean;
  published: boolean;
  publishedAt: string;
  updatedAt: string;
}
