import { Injectable } from '@angular/core';

const SESSION_KEY = 'hei_admin_session_expiry';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly timeoutMs = 15 * 60 * 1000;

  start() {
    this.setExpiry(Date.now() + this.timeoutMs);
  }

  touch() {
    if (!this.getExpiry()) {
      return;
    }
    this.setExpiry(Date.now() + this.timeoutMs);
  }

  clear() {
    localStorage.removeItem(SESSION_KEY);
  }

  isExpired(): boolean {
    const expiry = this.getExpiry();
    if (!expiry) {
      return true;
    }
    return Date.now() > expiry;
  }

  private getExpiry(): number | null {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) {
      return null;
    }
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : null;
  }

  private setExpiry(value: number) {
    localStorage.setItem(SESSION_KEY, String(value));
  }
}
