import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { faqs } from '../../data/hotel-data';

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
      description: 'April to October offers clear skies, festivals, and easy access to scenic routes.'
    },
    {
      title: 'Altitude comfort',
      description: 'Hydrate well, take it slow on day one, and enjoy gentle acclimatization walks.'
    },
    {
      title: 'What to pack',
      description: 'Layered clothing, sunscreen, and a reusable bottle keep you comfortable throughout the day.'
    }
  ];

  constructor(private readonly seo: SeoService) {
    this.seo.update({
      title: 'FAQ | Himalayan Eco Inn',
      description:
        'Find answers to common questions about hotel stays, room bookings, and services at Himalayan Eco Inn in Leh, Ladakh.',
      keywords:
        'Himalayan Eco Inn FAQ, Leh Ladakh hotel questions, homestay in Leh, room booking policies'
    });
  }
}
