import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode'; // fix import syntax for jwt-decode
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  backendUrl = environment.baseUrl + '/auth';

  roles: string | undefined;
  username: string | undefined;
  accessToken!: string | undefined;

  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() {
    this.loadJwtFromLocalStorage();
  }

  login(username: string, password: string): Observable<any> {
    const body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post(`${this.backendUrl}/login`, body, { headers });
  }

  register(username: string, password: string): Observable<any> {
    const body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post(`${this.backendUrl}/register`, body, { headers });
  }




  loadProfile(data: any) {
    this.accessToken = data['access-token'];

    if (!this.accessToken) {
      throw new Error('Access token is undefined');
    }

    const decodedToken: any = jwtDecode(this.accessToken);
    this.roles = decodedToken['scope'];
    this.username = decodedToken['sub'];
    localStorage.setItem('access-token', this.accessToken);
  }


  logout() {
    this.roles = undefined;
    this.username = undefined;
    this.accessToken = undefined;
    localStorage.removeItem('access-token');
    this.router.navigate(['/login']);
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    const body = {
      oldPassword: oldPassword,
      newPassword: newPassword
    };
    return this.http.put(`${this.backendUrl}/change-password`, body,
      {
        responseType : "text",
      });
  }

  get isAuthenticated(): boolean {
    const token = this.accessToken || localStorage.getItem('access-token');
    if (!token) return false;

    try {
      const decoded: any = jwtDecode(token);
      const now = Math.floor(Date.now() / 1000);
      return decoded.exp && decoded.exp > now;
    } catch (e) {
      return false;
    }
  }


  loadJwtFromLocalStorage() {
    const token = localStorage.getItem('access-token');
    if (token) {
      try {
        this.loadProfile({ 'access-token': token });
      } catch (e) {
        console.error('Invalid token in localStorage', e);
        this.logout();
      }
    }
  }

}
