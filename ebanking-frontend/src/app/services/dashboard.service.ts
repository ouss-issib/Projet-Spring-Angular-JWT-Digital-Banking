import { DashboardData } from './../models/dashboard.model';
// src/app/services/dashboard.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);
  private backendUrl = environment.baseUrl + '/api/dashboard';

  getDashboardData(): Observable<DashboardData> {
    return this.http.get<DashboardData>(this.backendUrl);
  }

  getAccountsByType(): Observable<{ Saving: number; Current: number }> {
    return this.http.get<{ Saving: number; Current: number }>(`${this.backendUrl}/accounts-by-type`);
  }
}
