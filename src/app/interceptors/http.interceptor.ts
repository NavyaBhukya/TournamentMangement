import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private router: Router,
    private commonService: CommonService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/user/login') || req.url.includes('/user/register')) {
      return next.handle(req).pipe(
        catchError(this.handleError.bind(this))
      );
    }
    const token = localStorage.getItem('token') || '';
    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(modifiedReq).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (
      error.status === 401 ||
      error.error?.error === 'Unauthorized' ||
      error.error?.message === 'Token has expired'
    ) {
      localStorage.clear();
      this.commonService.showHeader.emit();
      this.router.navigate(['/login']);
    }
    return throwError(() => error);
  }
}