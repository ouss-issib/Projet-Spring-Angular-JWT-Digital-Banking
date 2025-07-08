import { Observable } from 'rxjs';
// src/app/services/auth.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // private readonly USER_KEY = 'ebanking_user';
  backendUrl = environment.baseUrl + '/auth';

  isAuthenticated : boolean = false;
  roles :any ;
  username : any;
  accessToken !:string;

  private http = inject(HttpClient);

  login(username: string, password: string): Observable<any> {
    let params = new HttpParams().set('username', username)
                                 .set('password', password);

    let options = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };
    return this.http.post(`${this.backendUrl}/login`, params,options)
  }

  loadProfile(data:any) {
    this.isAuthenticated = true;
    this.accessToken = data['access-token'];
    let decodedToken: any = jwtDecode(this.accessToken);
    this.roles = decodedToken['scope'];
    this.username = decodedToken['sub'];
    // localStorage.setItem('access-token', this.accessToken);
  }

  // login(username: string, password: string): boolean {
  //   // For demo: accept any username/password, in real app call backend!
  //   if (username && password) {
  //     localStorage.setItem(this.USER_KEY, username);
  //     return true;
  //   }
  //   return false;
  // }

  // register(username: string, password: string): boolean {
  //   // For demo: always succeed, in real app call backend!
  //   if (username && password) {
  //     localStorage.setItem(this.USER_KEY, username);
  //     return true;
  //   }
  //   return false;
  // }

  logout() {
    // localStorage.removeItem(this.USER_KEY);
  }

  getUsername() {
    // return localStorage.getItem(this.USER_KEY);
  }

  // isLoggedIn(): boolean {
  //   return !!this.getUsername();
  // }
}
