import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { loginInterface } from './interface/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public baseUrl = environment.baseUrl
  constructor(private http: HttpClient) { }
  public login(payload: { email: string, password: string }): Observable<loginInterface> {
    return this.http.post<loginInterface>(`${this.baseUrl}user`, payload)
  }
  public userSignup(payload: { name: string, email: string, mobile: string, password: string }): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}user/register`, payload)
  }
}
