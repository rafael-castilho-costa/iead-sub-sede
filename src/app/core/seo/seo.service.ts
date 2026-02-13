import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoData } from './seo.types';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly siteName = 'IEAD Jardim Todos os Santos';
  private readonly siteUrl = 'https://ieadsubsede.org.br';
  private readonly defaultImage = '/assets/IEAD-SUBSEDE.png';
  private readonly jsonLdScriptId = 'seo-jsonld';

  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  applySeo(data: SeoData): void {
    const canonicalUrl = this.toAbsoluteUrl(data.canonicalPath);
    const imageUrl = this.toAbsoluteUrl(data.imagePath ?? this.defaultImage);
    const type = data.type ?? 'website';

    this.title.setTitle(data.title);
    this.meta.updateTag({ name: 'description', content: data.description });
    this.meta.updateTag({ property: 'og:title', content: data.title });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    this.meta.updateTag({ property: 'og:type', content: type });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ property: 'og:site_name', content: this.siteName });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: data.title });
    this.meta.updateTag({ name: 'twitter:description', content: data.description });
    this.meta.updateTag({ name: 'twitter:image', content: imageUrl });

    this.setCanonical(canonicalUrl);
    this.clearStructuredData();

    if (data.structuredData) {
      this.setStructuredData(data.structuredData);
    }
  }

  private setCanonical(url: string): void {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }

    link.setAttribute('href', url);
  }

  private clearStructuredData(): void {
    const existing = this.document.getElementById(this.jsonLdScriptId);
    if (existing) {
      existing.remove();
    }
  }

  private setStructuredData(
    structuredData: Record<string, unknown> | Array<Record<string, unknown>>
  ): void {
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.id = this.jsonLdScriptId;
    script.text = JSON.stringify(structuredData);
    this.document.head.appendChild(script);
  }

  private toAbsoluteUrl(path: string): string {
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }

    if (path === '/') {
      return this.siteUrl;
    }

    return `${this.siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
  }
}

