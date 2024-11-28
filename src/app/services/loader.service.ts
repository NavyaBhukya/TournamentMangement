import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoadingSpinner = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoadingSpinner.asObservable()
  show() {
      setTimeout(() => {
          this.isLoadingSpinner.next(true);
      });
  }
  hide() {
      setTimeout(() => {
          this.isLoadingSpinner.next(false);
      });
  }}
