import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { galleryItems } from '../../data/hotel-data';

@Component({
  selector: 'app-gallery',
  imports: [NgFor, RouterLink],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  items = galleryItems;

  constructor(private readonly seo: SeoService) {
    this.seo.update({
      title: 'Gallery | Himalayan Eco Inn',
      description:
        'Explore Himalayan Eco Inn through curated photos of rooms, dining spaces, and Himalayan views in Leh, Ladakh.',
      keywords:
        'Himalayan Eco Inn gallery, Leh Ladakh hotel photos, rooms and dining, homestay in Leh'
    });
  }
}
