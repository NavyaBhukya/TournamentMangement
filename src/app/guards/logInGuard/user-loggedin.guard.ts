import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userLoggedinGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  if (token) {
    try { // Validate the token (e.g., JWT expiry or structure check)
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      // const isExpired = decodedToken.exp && decodedToken.exp * 1000 < Date.now();
      // if (!isExpired) {
        return true; // Token is valid
      // }
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }
  // Redirect to login if not authenticated
  const router = inject(Router);
  router.navigate(['/login']);
  return false;
};
