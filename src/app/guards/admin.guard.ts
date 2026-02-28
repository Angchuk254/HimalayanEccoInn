import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SessionService } from '../services/session.service';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const sessionService = inject(SessionService);

  return authService.isAuthenticated().pipe(
    map((isAuthed) => {
      const expired = sessionService.isExpired();
      if (!isAuthed || expired) {
        if (expired) {
          sessionService.clear();
        }
        router.navigate(['/admin/login']);
      }
      return isAuthed && !expired;
    }),
    catchError(() => {
      router.navigate(['/admin/login']);
      return of(false);
    })
  );
};
