import { Component } from '@angular/core';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {
  constructor(private readonly seo: SeoService) {
    this.seo.update({
      title: 'Privacy Policy | Himalayan Eco Inn',
      description:
        'Read how Himalayan Eco Inn collects, uses, and protects your personal information.',
      keywords: 'Himalayan Eco Inn privacy policy, Leh Ladakh hotel privacy, data protection'
    });
  }
}
