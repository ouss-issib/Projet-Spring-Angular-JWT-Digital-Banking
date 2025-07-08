import { Observable } from 'rxjs';
// src/app/services/auth.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  backendUrl = environment.baseUrl + '/auth';

  isAuthenticated : boolean = false;
  roles :any ;
  username : any;
  accessToken !:any;

  private http = inject(HttpClient);
  private router = inject(Router);

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
     this.loadProfile({ "access-token" : token });
     this.router.navigate(['/admin/customers']);
    }
  }
}
