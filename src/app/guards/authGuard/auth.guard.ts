import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);
  const isLoggedIn = !!localStorage.getItem('token'); // Check if token exists in local storage

  // If logged in, allow access; otherwise, redirect to login
  return isLoggedIn ? true : router.createUrlTree(['/login']);
};


export const authRedirectGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = !!localStorage.getItem('token');

  // If logged in and on a fallback route, redirect to the await feature
  if (isLoggedIn && (route.routeConfig?.path === '' || route.routeConfig?.path === '**')) {
    return router.createUrlTree(['/feature']);
  }

  // Otherwise, allow access
  return true;
};