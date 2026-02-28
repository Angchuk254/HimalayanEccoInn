import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { testimonials } from '../../data/hotel-data';

@Component({
  selector: 'app-reviews',
  imports: [NgFor, RouterLink],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {
  reviews = testimonials;
  highlights = [
    { title: '4.9 average rating', detail: 'Across recent guest stays and curated surveys.' },
    { title: 'Warm Ladakhi hospitality', detail: 'Friendly concierge support and local expertise.' },
    { title: 'Comfort-first rooms', detail: 'Quiet layouts, thoughtful amenities, and cozy lighting.' }
  ];

  constructor(private readonly seo: SeoService) {
    this.seo.update({
      title: 'Guest Reviews | Himalayan Eco Inn',
      description:
        'Read guest reviews and stories from hotel stays at Himalayan Eco Inn in Leh, Ladakh.',
      keywords:
        'Himalayan Eco Inn reviews, Leh Ladakh guest reviews, hotel testimonials, homestay in Leh'
    });
  }
}
