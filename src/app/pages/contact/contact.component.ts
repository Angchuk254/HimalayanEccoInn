import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { SeoService } from '../../services/seo.service';
import { roomTypes } from '../../data/hotel-data';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, NgIf, NgFor, RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  private readonly contactService = inject(ContactService);
  private readonly seo = inject(SeoService);

  submitted = false;
  isLoading = false;
  errorMessage = '';
  successMessage = false;
  recommendedRooms = roomTypes.slice(0, 2);

  contactForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [
      '',
      [
        Validators.required,
        Validators.pattern(/^\+?[0-9][0-9\s-]{7,14}$/)
      ]
    ],
    dates: [''],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  constructor() {
    this.seo.update({
      title: 'Contact Himalayan Eco Inn | Leh Ladakh',
      description:
        'Contact Himalayan Eco Inn to book hotel rooms or a homestay-style stay in Leh, Ladakh.',
      keywords:
        'contact Himalayan Eco Inn, Leh hotel booking, Ladakh room booking, homestay in Leh, Ladakh concierge'
    });
  }

  async submit() {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = false;
    this.contactForm.markAllAsTouched();
    if (this.contactForm.invalid) {
      this.errorMessage = 'Please fill all required fields.';
      return;
    }
    this.isLoading = true;
    try {
      await this.contactService.submitMessage(this.contactForm.getRawValue());
      this.contactForm.reset();
      this.submitted = false;
      this.successMessage = true;
    } catch (error) {
      const code = (error as { code?: string }).code ?? '';
      if (code.includes('permission-denied')) {
        this.errorMessage = 'Permission denied. Check database rules.';
      } else if (code.includes('network-request-failed')) {
        this.errorMessage = 'Network error. Please try again.';
      } else {
        this.errorMessage = 'Something went wrong. Please try again.';
      }
    } finally {
      this.isLoading = false;
    }
  }
}
