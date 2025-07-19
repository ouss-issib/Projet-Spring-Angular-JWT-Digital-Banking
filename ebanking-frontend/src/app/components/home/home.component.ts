import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DashboardChartComponent } from '../dashboard-chart/dashboard-chart.component';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardAccountsByTypeComponent } from '../dashboard-accounts-by-type/dashboard-accounts-by-type.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DashboardChartComponent, DashboardAccountsByTypeComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  dashboardData: any;
  accountsByType: { Saving: number; Current: number } = { Saving: 0, Current: 0 };
  role: string = 'ADMIN';
  username: string = 'Admin';

  isLoading: boolean = false;

  constructor(
    private http: HttpClient,
    private dashboardService: DashboardService
  ) {}

  ngOnInit() {
    this.isLoading = true;

    this.dashboardService.getDashboardData().subscribe({
      next: data => {
        console.log('Dashboard data:', data);
        this.dashboardData = data; // ✅ FIXED
        this.isLoading = false;
      },
      error: error => {
        console.error('Error fetching dashboard data:', error);
        this.isLoading = false;
      }
    });

    this.dashboardService.getAccountsByType().subscribe({
      next: data => {
        this.accountsByType = data;
      },
      error: err => {
        console.error(err);
      }
    });
  }
}
