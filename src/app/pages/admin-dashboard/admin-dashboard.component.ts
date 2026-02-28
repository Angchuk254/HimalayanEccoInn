import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ContactService, ContactMessage } from '../../services/contact.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { AnalyticsService } from '../../services/analytics.service';
import { SessionService } from '../../services/session.service';
import { Chart } from 'chart.js/auto';
import { Subject, combineLatest, fromEvent, interval, merge, takeUntil, throttleTime } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  imports: [NgFor, NgIf, AsyncPipe],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements AfterViewInit, OnDestroy {
  private readonly contactService = inject(ContactService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);
  private readonly analytics = inject(AnalyticsService);
  private readonly sessionService = inject(SessionService);
  private readonly destroy$ = new Subject<void>();

  @ViewChild('visitsChart') visitsChart?: ElementRef<HTMLCanvasElement>;
  @ViewChild('contactsChart') contactsChart?: ElementRef<HTMLCanvasElement>;
  @ViewChild('statusChart') statusChart?: ElementRef<HTMLCanvasElement>;
  @ViewChild('weekdayChart') weekdayChart?: ElementRef<HTMLCanvasElement>;
  private visitsChartInstance?: Chart;
  private contactsChartInstance?: Chart;
  private statusChartInstance?: Chart;
  private weekdayChartInstance?: Chart;

  messages$ = this.contactService.getMessages();
  totalVisits$ = this.analytics.getTotalVisits();
  dailyVisits$ = this.analytics.getDailyVisits();
  filter: 'all' | 'new' | 'reviewed' = 'all';

  constructor() {
    this.seo.update({
      title: 'Admin Dashboard | Himalayan Eco Inn',
      description: 'Manage guest inquiries from Himalayan Eco Inn website.',
      robots: 'noindex, nofollow'
    });
  }

  setFilter(value: 'all' | 'new' | 'reviewed') {
    this.filter = value;
  }

  async markReviewed(message: ContactMessage) {
    if (!message.id) {
      return;
    }
    await this.contactService.markReviewed(message.id);
  }

  getStatusCount(messages: ContactMessage[], status: 'new' | 'reviewed') {
    return messages.filter((message) => message.status === status).length;
  }

  ngAfterViewInit() {
    this.startSessionWatcher();
    this.attachActivityListeners();
    this.initCharts();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.visitsChartInstance?.destroy();
    this.contactsChartInstance?.destroy();
    this.statusChartInstance?.destroy();
    this.weekdayChartInstance?.destroy();
  }

  formatDate(value: unknown): string {
    if (!value) {
      return '—';
    }
    if (typeof value === 'number') {
      return new Date(value).toLocaleString();
    }
    const maybeDate = (value as { toDate?: () => Date }).toDate?.();
    if (maybeDate) {
      return maybeDate.toLocaleString();
    }
    if (value instanceof Date) {
      return value.toLocaleString();
    }
    return String(value);
  }

  async logout() {
    this.sessionService.clear();
    await this.authService.logout();
    await this.router.navigate(['/admin/login']);
  }

  private startSessionWatcher() {
    interval(10000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(async () => {
        if (this.sessionService.isExpired()) {
          await this.logout();
        }
      });
  }

  private attachActivityListeners() {
    merge(
      fromEvent(document, 'click'),
      fromEvent(document, 'keydown'),
      fromEvent(document, 'mousemove'),
      fromEvent(document, 'scroll'),
      fromEvent(document, 'touchstart')
    )
      .pipe(throttleTime(1000), takeUntil(this.destroy$))
      .subscribe(() => this.sessionService.touch());
  }

  private initCharts() {
    combineLatest([this.dailyVisits$, this.messages$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([dailyVisits, messages]) => {
        const labels = this.lastSevenDays();
        const visitData = labels.map((label) => dailyVisits[label] ?? 0);
        const contactData = labels.map((label) =>
          messages.filter((message) => this.toDateKey(message.createdAt) === label).length
        );
        const newCount = this.getStatusCount(messages, 'new');
        const reviewedCount = this.getStatusCount(messages, 'reviewed');
        const weekdayData = this.weekdayBuckets(messages);

        this.updateVisitsChart(labels, visitData);
        this.updateContactsChart(labels, contactData);
        this.updateStatusChart([newCount, reviewedCount]);
        this.updateWeekdayChart(weekdayData);
      });
  }

  private updateVisitsChart(labels: string[], data: number[]) {
    if (!this.visitsChart?.nativeElement) {
      return;
    }
    if (!this.visitsChartInstance) {
      this.visitsChartInstance = new Chart(this.visitsChart.nativeElement, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Website visits',
              data,
              borderColor: '#1c3d5a',
              backgroundColor: 'rgba(28, 61, 90, 0.15)',
              fill: true,
              tension: 0.35
            }
          ]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
      });
      return;
    }
    this.visitsChartInstance.data.labels = labels;
    this.visitsChartInstance.data.datasets[0].data = data;
    this.visitsChartInstance.update();
  }

  private updateContactsChart(labels: string[], data: number[]) {
    if (!this.contactsChart?.nativeElement) {
      return;
    }
    if (!this.contactsChartInstance) {
      this.contactsChartInstance = new Chart(this.contactsChart.nativeElement, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'Contact requests',
              data,
              backgroundColor: 'rgba(53, 109, 133, 0.6)'
            }
          ]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
      });
      return;
    }
    this.contactsChartInstance.data.labels = labels;
    this.contactsChartInstance.data.datasets[0].data = data;
    this.contactsChartInstance.update();
  }

  private updateStatusChart(data: number[]) {
    if (!this.statusChart?.nativeElement) {
      return;
    }
    if (!this.statusChartInstance) {
      this.statusChartInstance = new Chart(this.statusChart.nativeElement, {
        type: 'doughnut',
        data: {
          labels: ['New', 'Reviewed'],
          datasets: [
            {
              data,
              backgroundColor: ['rgba(255, 193, 7, 0.75)', 'rgba(25, 135, 84, 0.75)'],
              borderWidth: 0
            }
          ]
        },
        options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
      });
      return;
    }
    this.statusChartInstance.data.datasets[0].data = data;
    this.statusChartInstance.update();
  }

  private updateWeekdayChart(data: number[]) {
    if (!this.weekdayChart?.nativeElement) {
      return;
    }
    const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    if (!this.weekdayChartInstance) {
      this.weekdayChartInstance = new Chart(this.weekdayChart.nativeElement, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'Contacts',
              data,
              backgroundColor: 'rgba(28, 61, 90, 0.6)'
            }
          ]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
      });
      return;
    }
    this.weekdayChartInstance.data.labels = labels;
    this.weekdayChartInstance.data.datasets[0].data = data;
    this.weekdayChartInstance.update();
  }

  private lastSevenDays() {
    const days: string[] = [];
    const now = new Date();
    for (let i = 6; i >= 0; i -= 1) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      days.push(date.toISOString().slice(0, 10));
    }
    return days;
  }

  private toDateKey(value: ContactMessage['createdAt']) {
    if (typeof value === 'number') {
      return new Date(value).toISOString().slice(0, 10);
    }
    return '';
  }

  private weekdayBuckets(messages: ContactMessage[]) {
    const buckets = Array.from({ length: 7 }).map(() => 0);
    messages.forEach((message) => {
      if (typeof message.createdAt !== 'number') {
        return;
      }
      const dayIndex = new Date(message.createdAt).getDay();
      buckets[dayIndex] += 1;
    });
    return buckets;
  }
}
