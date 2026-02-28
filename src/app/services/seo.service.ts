import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly baseUrl = environment.baseUrl ?? 'https://himalayanecoinn.com';

  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
    private readonly router: Router,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  update(config: {
    title: string;
    description: string;
    keywords?: string;
    url?: string;
    image?: string;
    robots?: string;
  }) {
    this.title.setTitle(config.title);
    this.meta.updateTag({ name: 'description', content: config.description });
    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }
    if (config.robots) {
      this.meta.updateTag({ name: 'robots', content: config.robots });
    }

    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });

    const loc = this.document?.location?.href ?? '';
    const url =
      config.url ??
      (loc && !loc.includes('localhost') ? loc : `${this.baseUrl}${this.getPath()}`);
    if (url) {
      this.meta.updateTag({ property: 'og:url', content: url });
      this.setLinkTag('canonical', url);
    }

    if (config.image) {
      this.meta.updateTag({ property: 'og:image', content: config.image });
      this.meta.updateTag({ name: 'twitter:image', content: config.image });
    }
  }

  private getPath(): string {
    const path = this.router.url.split('?')[0];
    return path.startsWith('/') ? path : `/${path}`;
  }

  private setLinkTag(rel: string, href: string) {
    if (!this.document?.head) {
      return;
    }
    let link = this.document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', rel);
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }
}
