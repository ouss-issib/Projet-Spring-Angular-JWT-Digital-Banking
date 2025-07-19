import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode'; // fix import syntax for jwt-decode
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  backendUrl = environment.baseUrl + '/auth';

  isAuthenticated: boolean = false;
  roles: string | undefined;
  username: string | undefined;
  accessToken!: string | undefined;

  private http = inject(HttpClient);
  private router = inject(Router);

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
    this.isAuthenticated = true;
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
    this.isAuthenticated = false;
    this.roles = undefined;
    this.username = undefined;
    this.accessToken = undefined;
    localStorage.removeItem('access-token');
    this.router.navigate(['/login']);
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
