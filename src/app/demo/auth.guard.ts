import { inject } from '@angular/core';

import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from './service/auth.service';
const LOGIN_ROUTE = "/auth/login"

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const loginService = inject(AuthService);
  const router = inject(Router);


  return loginService.isLoggedIn().pipe(
    map(loggedIn => loggedIn ? true : router.createUrlTree([router.parseUrl(LOGIN_ROUTE)], {
      queryParams: { loggedOut: true, origUrl: state.url }

    })),
    catchError((err) => {
      router.navigate([LOGIN_ROUTE], {
        queryParams: { loggedOut: true, origUrl: state.url }
      });
      return of(false);
    })
  )
}
