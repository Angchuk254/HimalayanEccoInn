import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { roomTypes } from '../../data/hotel-data';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-rooms',
  imports: [NgFor],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent {
  rooms = roomTypes;
  amenities = [
    'Heated flooring and climate control',
    'Organic bath amenities',
    'High-speed Wi-Fi and smart TV',
    '24/7 concierge assistance',
    'Eco-friendly toiletries and linen'
  ];

  constructor(private readonly seo: SeoService) {
    this.seo.update({
      title: 'Rooms & Amenities | Himalayan Eco Inn',
      description:
        'Discover Himalayan Eco Inn rooms in Leh, Ladakh with mountain views, modern amenities, and homestay-style comfort.',
      keywords:
        'hotel rooms in Leh, Ladakh rooms and suites, homestay rooms Ladakh, Himalayan Eco Inn amenities'
    });
  }
}
