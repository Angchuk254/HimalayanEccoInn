import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { experiences } from '../../data/hotel-data';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-experience',
  imports: [NgClass, NgFor],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent implements AfterViewInit, OnDestroy {
  experienceList = experiences;
  @ViewChild('experienceScroll') experienceScroll?: ElementRef<HTMLDivElement>;
  private animationId?: number;
  private cleanupFns: Array<() => void> = [];
  private autoScrollActive = false;
  private pauseUntil = 0;

  categories = [
    {
      title: 'Dining Experience',
      description: 'Chef-led Ladakhi cuisine, organic garden harvests, and sunset dining.',
      image:
        'assets/ec-inn-view.jpg'
    },
    {
      title: 'Rooms & Suites',
      description: 'Warm textures, modern technology, and Himalayan-inspired interiors.',
      image:
        'assets/view-room.jpg'
    },
    {
      title: 'Outdoor Experiences',
      description: 'Guided trails, monastery visits, and panoramic rooftop moments.',
      image:
        'assets/view-co-inn.jpg'
    }
  ];

  constructor(private readonly seo: SeoService) {
    this.seo.update({
      title: 'Experience Ladakh | Himalayan Eco Inn',
      description:
        'Explore dining, wellness, cultural walks, and outdoor adventures curated by Himalayan Eco Inn in Leh, Ladakh.',
      keywords:
        'Ladakh experiences, Leh dining, Himalayan Eco Inn activities, hotel in Leh Ladakh, Ladakh homestay'
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
