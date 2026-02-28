import { Component } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { nearbyPlaces } from '../../data/hotel-data';

@Component({
  selector: 'app-nearby',
  imports: [NgClass, NgFor, RouterLink],
  templateUrl: './nearby.component.html',
  styleUrl: './nearby.component.scss'
})
export class NearbyComponent {
  places = nearbyPlaces;
  categories = ['All', 'Monastery', 'Viewpoint', 'Village', 'Restaurant'] as const;
  activeCategory: (typeof this.categories)[number] = 'All';

  constructor(private readonly seo: SeoService) {
    this.seo.update({
      title: 'Nearby Places | Himalayan Eco Inn',
      description:
        'Discover nearby monasteries, viewpoints, villages, and restaurants around Himalayan Eco Inn in Leh, Ladakh.',
      keywords:
        'Leh nearby places, Ladakh monasteries, Leh restaurants, things to do in Leh, Ladakh hotel location'
    });
  }

  setCategory(category: (typeof this.categories)[number]) {
    this.activeCategory = category;
  }

  get filteredPlaces() {
    if (this.activeCategory === 'All') {
      return this.places;
    }
    return this.places.filter((place) => place.category === this.activeCategory);
  }
}
