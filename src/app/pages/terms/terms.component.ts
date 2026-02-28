import { Component } from '@angular/core';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.scss'
})
export class TermsComponent {
  constructor(private readonly seo: SeoService) {
    this.seo.update({
      title: 'Terms & Conditions | Himalayan Eco Inn',
      description: 'Review the booking and stay terms for Himalayan Eco Inn.',
      keywords: 'Himalayan Eco Inn terms, Leh Ladakh hotel policies, room booking terms'
    });
  }
}
