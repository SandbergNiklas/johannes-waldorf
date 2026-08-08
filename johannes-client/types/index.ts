export interface Section {
  id: number;
  name: string;
  title: string;
  content: string;
  imageUrl: string;
  updatedAt: string;
}
export interface SiteSettings {
  id: number;
  quote: string;
  quoteAuthor: string;
}
export interface Image {
  id: number;
  fileName: string;
  url: string;
  altText: string;
  caption?: string;
  isGallery: boolean;
}