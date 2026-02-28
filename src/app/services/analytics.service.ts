import { Injectable } from '@angular/core';
import { Database, objectVal, ref, runTransaction } from '@angular/fire/database';
import { Observable, map } from 'rxjs';

const VISIT_KEY = 'hei_visit_logged';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  constructor(private readonly database: Database) {}

  trackVisit() {
    if (typeof sessionStorage === 'undefined') return;
    if (sessionStorage.getItem(VISIT_KEY)) {
      return;
    }
    sessionStorage.setItem(VISIT_KEY, 'true');
    const totalRef = ref(this.database, 'analytics/visits/total');
    runTransaction(totalRef, (current) => (Number(current) || 0) + 1);

    const dateKey = new Date().toISOString().slice(0, 10);
    const dailyRef = ref(this.database, `analytics/visits/daily/${dateKey}`);
    runTransaction(dailyRef, (current) => (Number(current) || 0) + 1);
  }

  getTotalVisits(): Observable<number> {
    return objectVal<number>(ref(this.database, 'analytics/visits/total')).pipe(
      map((value) => Number(value) || 0)
    );
  }

  getDailyVisits(): Observable<Record<string, number>> {
    return objectVal<Record<string, number>>(ref(this.database, 'analytics/visits/daily')).pipe(
      map((value) => value ?? {})
    );
  }
}
