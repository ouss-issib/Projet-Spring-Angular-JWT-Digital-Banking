import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from './../../../models/customer.model';
import { CustomerService } from './../../../services/customer.service';

@Component({
  selector: 'app-view-customer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {
  customer?: Customer;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.customerService.getCustomerById(id).subscribe({
      next: (data: Customer) => this.customer = data,
      error: (err: any) => this.errorMessage = 'Customer not found.'
    });
  }

  goBack() {
    this.router.navigate(['/admin/customers']);
  }
}
