import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DashboardChartComponent } from '../dashboard-chart/dashboard-chart.component';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardAccountsByTypeComponent } from '../dashboard-accounts-by-type/dashboard-accounts-by-type.component';
import { AuthService } from '../../services/auth.service';

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

  // au lieu d'initialiser en dur, on laisse undefined et on récupère au chargement
  role: string | undefined;
  username: string | undefined;

  isLoading: boolean = false;

  constructor(
    private http: HttpClient,
    private dashboardService: DashboardService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.isLoading = true;

    // On charge les données du dashboard
    this.dashboardService.getDashboardData().subscribe({
      next: data => {
        this.dashboardData = data;
        this.isLoading = false;
      },
      error: error => {
        console.error('Error fetching dashboard data:', error);
        this.isLoading = false;
      }
    });

    // Charge les comptes par type
    this.dashboardService.getAccountsByType().subscribe({
      next: data => {
        this.accountsByType = data;
      },
      error: err => {
        console.error(err);
      }
    });

    // IMPORTANT : Récupérer le rôle et username depuis AuthService
    this.role = this.authService.roles?.includes("ADMIN") ? "ADMIN":"USER";      // par ex. "ROLE_ADMIN" ou "ROLE_USER"
    this.username = this.authService.username;
  }
}

