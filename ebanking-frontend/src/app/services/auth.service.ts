import { Observable } from 'rxjs';
// src/app/services/auth.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly USER_KEY = 'ebanking_user';


  backendUrl = environment.baseUrl + '/auth';
  private http = inject(HttpClient);

  login(username: string, password: string): Observable<any> {
    let params = new HttpParams().set('username', username)
                                 .set('password', password);

    let options = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };
    return this.http.post(`${this.backendUrl}/login`, params,options)
  }

  // login(username: string, password: string): boolean {
  //   // For demo: accept any username/password, in real app call backend!
  //   if (username && password) {
  //     localStorage.setItem(this.USER_KEY, username);
  //     return true;
  //   }
  //   return false;
  // }

  register(username: string, password: string): boolean {
    // For demo: always succeed, in real app call backend!
    if (username && password) {
      localStorage.setItem(this.USER_KEY, username);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.USER_KEY);
  }

  getUsername(): string | null {
    return localStorage.getItem(this.USER_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getUsername();
  }
}
