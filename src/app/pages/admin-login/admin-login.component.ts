import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { SeoService } from '../../services/seo.service';
import { SessionService } from '../../services/session.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-admin-login',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);
  private readonly sessionService = inject(SessionService);

  submitted = false;
  isLoading = false;
  errorMessage = '';

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor() {
    this.seo.update({
      title: 'Admin Login | Himalayan Eco Inn',
      description: 'Admin access for Himalayan Eco Inn contact inquiries.',
      robots: 'noindex, nofollow'
    });

    this.authService
      .isAuthenticated()
      .pipe(take(1))
      .subscribe((isAuthed) => {
        if (isAuthed && !this.sessionService.isExpired()) {
          this.router.navigate(['/admin']);
        }
      });
  }

  async submit() {
    this.submitted = true;
    this.errorMessage = '';
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please enter a valid email and password.';
      return;
    }
    this.isLoading = true;
    try {
      const { email, password } = this.loginForm.getRawValue();
      await this.withTimeout(this.authService.login(email, password), 12000);
      this.sessionService.start();
      await this.router.navigate(['/admin']);
    } catch (error) {
      this.errorMessage = this.getAuthErrorMessage(error);
    } finally {
      this.isLoading = false;
    }
  }

  private getAuthErrorMessage(error: unknown): string {
    const code = (error as { code?: string }).code ?? '';
    if (code.includes('invalid-email')) {
      return 'Please enter a valid email address.';
    }
    if (code.includes('invalid-credential') || code.includes('wrong-password')) {
      return 'Invalid email or password.';
    }
    if (code.includes('user-not-found')) {
      return 'No account found for this email.';
    }
    if (code.includes('too-many-requests')) {
      return 'Too many attempts. Please try again later.';
    }
    if (code.includes('network-request-failed')) {
      return 'Network error. Check your connection and try again.';
    }
    if ((error as Error).message === 'timeout') {
      return 'Login is taking too long. Please try again.';
    }
    return 'Login failed. Please check credentials or Firebase settings.';
  }

  private withTimeout<T>(promise: Promise<T>, ms: number) {
    return new Promise<T>((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('timeout')), ms);
      promise
        .then((value) => {
          clearTimeout(timer);
          resolve(value);
        })
        .catch((error) => {
          clearTimeout(timer);
          reject(error);
        });
    });
  }
}
