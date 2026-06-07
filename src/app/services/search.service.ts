import { Injectable } from '@angular/core';
import {
  roomTypes,
  experiences,
  faqs,
  nearbyPlaces,
  galleryItems
} from '../data/hotel-data';

export interface SearchResult {
  title: string;
  description: string;
  url: string;
  category: string;
  icon: string;
}

const PAGES: SearchResult[] = [
  {
    title: 'Home',
    description: 'Himalayan Eco Inn – Luxury hotel and homestay in Leh, Ladakh',
    url: '/',
    category: 'Page',
    icon: 'bi-house-fill'
  },
  {
    title: 'About Us',
    description: 'Our story, values, and eco-philosophy in Leh, Ladakh',
    url: '/about',
    category: 'Page',
    icon: 'bi-info-circle-fill'
  },
  {
    title: 'Experiences',
    description: 'Stargazing, cultural walks, wellness, and high-altitude dining',
    url: '/experience',
    category: 'Page',
    icon: 'bi-stars'
  },
  {
    title: 'Rooms & Suites',
    description: 'Elegant mountain-view rooms with modern amenities',
    url: '/rooms',
    category: 'Page',
    icon: 'bi-door-open-fill'
  },
  {
    title: 'Gallery',
    description: 'Photos of the hotel, rooms, dining, and Ladakh views',
    url: '/gallery',
    category: 'Page',
    icon: 'bi-images'
  },
  {
    title: 'Reviews',
    description: 'Guest reviews and testimonials for Himalayan Eco Inn',
    url: '/reviews',
    category: 'Page',
    icon: 'bi-chat-quote-fill'
  },
  {
    title: 'FAQ',
    description: 'Frequently asked questions about stay, booking, and services',
    url: '/faq',
    category: 'Page',
    icon: 'bi-question-circle-fill'
  },
  {
    title: 'Nearby Places',
    description: 'Monasteries, viewpoints, and restaurants near the hotel',
    url: '/nearby',
    category: 'Page',
    icon: 'bi-map-fill'
  },
  {
    title: 'Contact & Book',
    description: 'Contact us to book a room or get a custom itinerary',
    url: '/contact',
    category: 'Page',
    icon: 'bi-envelope-fill'
  }
];

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9\s]/g, '');
}

function score(query: string, text: string): number {
  const q = normalize(query);
  const t = normalize(text);
  if (t.includes(q)) return 2;
  const words = q.split(/\s+/).filter(Boolean);
  return words.reduce((acc, w) => acc + (t.includes(w) ? 1 : 0), 0);
}

@Injectable({ providedIn: 'root' })
export class SearchService {
  private readonly corpus: SearchResult[] = [
    ...PAGES,
    ...roomTypes.map((r) => ({
      title: r.name,
      description: `${r.price} · ${r.view} · ${r.size}`,
      url: '/rooms',
      category: 'Room',
      icon: 'bi-building'
    })),
    ...experiences.map((e) => ({
      title: e.title,
      description: e.description,
      url: '/experience',
      category: 'Experience',
      icon: e.icon ?? 'bi-stars'
    })),
    ...faqs.map((f) => ({
      title: f.question,
      description: f.answer,
      url: '/faq',
      category: 'FAQ',
      icon: 'bi-question-circle-fill'
    })),
    ...nearbyPlaces.map((p) => ({
      title: p.name,
      description: `${p.category} · ${p.distance} away – ${p.summary}`,
      url: '/nearby',
      category: 'Nearby',
      icon: 'bi-geo-alt-fill'
    })),
    ...galleryItems.map((g) => ({
      title: g.title,
      description: 'Photo from Himalayan Eco Inn gallery',
      url: '/gallery',
      category: 'Gallery',
      icon: 'bi-image'
    }))
  ];

  search(query: string, limit = 20): SearchResult[] {
    if (!query || query.trim().length < 2) return [];
    const q = query.trim();
    return this.corpus
      .map((item) => ({
        item,
        s: score(q, item.title) * 3 + score(q, item.description)
      }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, limit)
      .map((x) => x.item);
  }

  getSuggestions(query: string): SearchResult[] {
    return this.search(query, 6);
  }
}
