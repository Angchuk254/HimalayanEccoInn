import { Component } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-about',
  imports: [NgClass, NgFor],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  values = [
    {
      title: 'Eco-first hospitality',
      description: 'Solar energy, water stewardship, and thoughtful local sourcing.',
      icon: 'bi-leaf-fill'
    },
    {
      title: 'Cultural connection',
      description: 'Partnerships with Ladakhi artisans, guides, and storytellers.',
      icon: 'bi-people-fill'
    },
    {
      title: 'Modern comfort',
      description: 'Luxury amenities designed for rest, recharge, and productivity.',
      icon: 'bi-stars'
    }
  ];

  signatureMoments = [
    {
      title: 'Arrival ritual',
      description: 'Warm Ladakhi welcome tea, local aromas, and a calm check-in flow.',
      icon: 'bi-cup-hot-fill'
    },
    {
      title: 'Mountain mornings',
      description: 'Yoga, fresh breakfast spreads, and slow views over the valley.',
      icon: 'bi-sunrise-fill'
    },
    {
      title: 'Evening wind-down',
      description: 'Soft lighting, stargazing deck, and curated dinner menus.',
      icon: 'bi-moon-stars-fill'
    }
  ];

  highlights = [
    {
      label: 'Design',
      detail: 'Local stone, warm wood, and Himalayan textures.',
      icon: 'bi-bricks'
    },
    {
      label: 'Cuisine',
      detail: 'Seasonal Ladakhi plates and organic garden dining.',
      icon: 'bi-egg-fried'
    },
    {
      label: 'Wellness',
      detail: 'Spa rituals, meditation decks, and slow living.',
      icon: 'bi-heart-pulse-fill'
    },
    {
      label: 'Concierge',
      detail: 'Custom itineraries with local guides and drivers.',
      icon: 'bi-compass-fill'
    }
  ];

  constructor(private readonly seo: SeoService) {
    this.seo.update({
      title: 'About Himalayan Eco Inn | Leh Ladakh',
      description:
        'Discover Himalayan Eco Inn, a boutique hotel and homestay-style stay in Leh, Ladakh blending modern comfort with Ladakhi heritage.',
      keywords:
        'about Himalayan Eco Inn, Leh Ladakh boutique hotel, homestay in Ladakh, eco luxury hotel Leh'
    });
  }
}
