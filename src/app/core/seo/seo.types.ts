export interface SeoData {
  title: string;
  description: string;
  canonicalPath: string;
  imagePath?: string;
  type?: 'website' | 'article';
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
}

