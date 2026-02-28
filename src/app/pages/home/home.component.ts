import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass, NgFor } from '@angular/common';
import {
  bookingPartners,
  experiences,
  faqs,
  galleryItems,
  hotelHighlights,
  roomTypes,
  storyTimeline,
  testimonials,
  trustBadges
} from '../../data/hotel-data';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-home',
  imports: [NgClass, NgFor, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  highlights = hotelHighlights;
  rooms = roomTypes;
  experienceList = experiences;
  testimonialList = testimonials;
  faqList = faqs;
  galleryPreview = galleryItems.slice(0, 4);
  timeline = storyTimeline;
  badges = trustBadges;
  partners = bookingPartners;
  @ViewChild('experienceScroll') experienceScroll?: ElementRef<HTMLDivElement>;
  private animationId?: number;
  private cleanupFns: Array<() => void> = [];
  private autoScrollActive = false;
  private pauseUntil = 0;

  constructor(private readonly seo: SeoService) {
    this.seo.update({
      title: 'Himalayan Eco Inn | Luxury Hotel in Leh Ladakh',
      description:
        'Himalayan Eco Inn is a luxury hotel and homestay-style retreat in Leh, Ladakh with elegant rooms and curated experiences.',
      keywords:
        'hotel in Leh Ladakh, homestay in Leh, Himalayan Eco Inn, luxury rooms in Ladakh, eco hotel Leh, Leh hotel booking',
      image: 'https://himalayanecoinn.com/assets/hotel-eco-inn.jpg'
    });
  }

  ngAfterViewInit() {
    this.startAutoScroll();
  }

  ngOnDestroy() {
    this.stopAutoScroll();
  }

  private startAutoScroll() {
    if (typeof window === 'undefined' || this.autoScrollActive) {
      return;
    }
    const container = this.experienceScroll?.nativeElement;
    if (!container || window.innerWidth >= 992) {
      return;
    }
    this.autoScrollActive = true;
    let lastTime = performance.now();
    const step = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      if (Date.now() >= this.pauseUntil) {
        container.scrollLeft += delta * 0.05;
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 2) {
          container.scrollLeft = 0;
        }
      }
      this.animationId = requestAnimationFrame(step);
    };
    this.animationId = requestAnimationFrame(step);

    const pause = () => {
      this.pauseUntil = Date.now() + 2500;
    };
    container.addEventListener('touchstart', pause, { passive: true });
    container.addEventListener('pointerdown', pause);
    container.addEventListener('wheel', pause, { passive: true });
    this.cleanupFns.push(() => container.removeEventListener('touchstart', pause));
    this.cleanupFns.push(() => container.removeEventListener('pointerdown', pause));
    this.cleanupFns.push(() => container.removeEventListener('wheel', pause));

    const onResize = () => {
      if (window.innerWidth >= 992) {
        this.stopAutoScroll();
      } else if (!this.autoScrollActive) {
        this.startAutoScroll();
      }
    };
    window.addEventListener('resize', onResize);
    this.cleanupFns.push(() => window.removeEventListener('resize', onResize));
  }

  private stopAutoScroll() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = undefined;
    }
    this.autoScrollActive = false;
    this.cleanupFns.forEach((fn) => fn());
    this.cleanupFns = [];
  }
}
