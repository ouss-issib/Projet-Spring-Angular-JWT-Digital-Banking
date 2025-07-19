import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-dashboard-accounts-by-type',
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard-accounts-by-type.component.html',
  styleUrl: './dashboard-accounts-by-type.component.css'
})

export class DashboardAccountsByTypeComponent implements OnChanges {
  @Input() saving: number = 0;
  @Input() current: number = 0;

  barChartLabels: string[] = ['SAVING ACCOUNT', 'CURRENT ACCOUNT'];
  barChartType: ChartType = 'bar';

  barChartData: ChartData<'bar', number[], string | string[]> = {
    labels: this.barChartLabels,
    datasets: [
      {
        label: 'Dashboard Stats',
        data: [this.saving, this.current],
        backgroundColor: ['#007bff', '#28a745']
      }
    ]
  };

  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: false },
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
          label: 'Number of Accounts',
          data: [this.saving, this.current],
          backgroundColor: ['#007bff', '#28a745']
        }
      ]
    };
  }
}
