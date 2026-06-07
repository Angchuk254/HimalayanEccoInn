import { Component, Inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { faqs } from '../../data/hotel-data';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-faq',
  imports: [NgFor, RouterLink],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  faqList = faqs;
  travelTips = [
    {
      title: 'Best travel window',
      description: 'April to October offers clear skies, festivals, and easy access to scenic routes. June–August is peak season.'
    },
    {
      title: 'Altitude comfort',
      description: 'Leh sits at 3,524m. Hydrate well, rest on arrival day, and enjoy gentle acclimatization walks around the property.'
    },
    {
      title: 'What to pack',
      description: 'Layered clothing, UV-protection sunscreen, sunglasses, a reusable bottle, and comfortable walking shoes.'
    },
    {
      title: 'Permits for restricted areas',
      description: 'Permits are needed for Nubra Valley, Pangong Lake, and Tso Moriri. Our concierge arranges them for you.'
    }
  ];

  constructor(
    private readonly seo: SeoService,
    @Inject(DOCUMENT) private readonly doc: Document
  ) {
    this.seo.update({
      title: 'FAQ – Ladakh Hotel, Tour & Stay Questions | Himalayan Eco Inn',
      description:
        'Answers to common questions about staying at Himalayan Eco Inn in Leh, Ladakh – altitude sickness, permits, best time to visit, tour packages, rooms, and booking policies.',
      keywords:
        'Ladakh hotel FAQ, Leh hotel questions, best time to visit Ladakh, Ladakh permits, altitude sickness Leh, Ladakh tour packages, hotel in Leh booking, Himalayan Eco Inn FAQ'
    });
    this.injectFaqSchema();
    this.injectBreadcrumb();
  }

  private injectFaqSchema() {
    const existing = this.doc.getElementById('faq-jsonld');
    if (existing) existing.remove();
    const script = this.doc.createElement('script');
    script.id = 'faq-jsonld';
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: this.faqList.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer }
      }))
    });
    this.doc.head.appendChild(script);
  }

  private injectBreadcrumb() {
    const existing = this.doc.getElementById('faq-breadcrumb-jsonld');
    if (existing) existing.remove();
    const script = this.doc.createElement('script');
    script.id = 'faq-breadcrumb-jsonld';
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://himalayanecoinn.com/' },
        { '@type': 'ListItem', position: 2, name: 'FAQ', item: 'https://himalayanecoinn.com/faq' }
      ]
    });
    this.doc.head.appendChild(script);
  }
}

