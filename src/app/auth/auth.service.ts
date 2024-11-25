import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public baseUrl = environment.baseUrl
  constructor(private http: HttpClient) { }
  public login(payload: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}auth/login`, payload)
  }
  public userSignup(payload:{name:string,email:string,mobile:string,password:string}):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}auth/register`,payload)
  }
}
