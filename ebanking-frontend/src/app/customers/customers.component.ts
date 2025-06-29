import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer.model';
import { catchError, Observable, of } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-customers',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
  private customerService = inject(CustomerService);
  private fb = inject(FormBuilder);

  customers!: Observable<Customer[]>;
  errorMessage!: string;

  customerForm: FormGroup;

  constructor() {
    this.customerForm = this.fb.group({
      name: [''],
      email: ['']
    });
  }

  ngOnInit(): void {
    this.customers = this.customerService.getCustomers().pipe(
      catchError(error => {
        this.errorMessage = 'Error loading customers: ' + error.message;
        return of([]);
      })
    );
  }
}
