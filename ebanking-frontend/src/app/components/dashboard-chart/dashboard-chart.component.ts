import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-dashboard-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard-chart.component.html',
  styleUrls: ['./dashboard-chart.component.css']
})
export class DashboardChartComponent implements OnChanges {
  @Input() customers: number = 0;
  @Input() accounts: number = 0;
  @Input() balance: number = 0;

  barChartLabels: string[] = ['Total Customers', 'Total Accounts', 'Total Balance'];
  barChartType: ChartType = 'line';

  barChartData: ChartData<'line', number[], string | string[]> = {
    labels: this.barChartLabels,
    datasets: [
      {
        label: 'Dashboard Stats',
        data: [this.customers, this.accounts, this.balance],
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.3)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
  ngOnChanges(changes: SimpleChanges): void {
    this.barChartData = {
      labels: this.barChartLabels,
      datasets: [
        {
          label: 'Dashboard Stats',
          data: [this.customers, this.accounts, this.balance],
          borderColor: '#007bff',
          backgroundColor: 'rgba(0, 123, 255, 0.3)',
          fill: true,
          tension: 0.4
        }
      ]
    };
  }

}
