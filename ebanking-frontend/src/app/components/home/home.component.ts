import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dashboardData: any;
  accountsByType: { Saving: number; Current: number } = { Saving: 0, Current: 0 };
  role: string = 'ADMIN';  // example role
  username: string = 'Admin';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('/api/dashboard').subscribe(data => {
      this.dashboardData = data;
    });

    this.http.get<{ Saving: number; Current: number }>('/api/dashboard/accounts-by-type').subscribe(data => {
      this.accountsByType = data;
    });
  }
}
