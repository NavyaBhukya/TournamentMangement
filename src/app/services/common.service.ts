import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public isEditPlayer = new BehaviorSubject<boolean>(false)
  constructor(private apiService: ApiService) { }
  public showHeader: EventEmitter<string> = new EventEmitter<string>
  // method to process the image upload
  public onProfileImageUploads(imageData: HTMLInputElement): Observable<string> {
    if (!imageData.files || imageData.files.length === 0) {
      return of('');
    }
    const file = imageData.files[0];
    if (file.size > 10 * 1024 * 1024) {
      alert('File size should be less than 10MB');
      return of('');
    }
    return this.apiService.uploadProfileImage(file).pipe(
      map((res: { message: string, url: string }) => res.url),
      catchError((error) => {
        console.error('Image upload error:', error);
        alert('Failed to upload image');
        return of('');
      })
    );
  }
}
