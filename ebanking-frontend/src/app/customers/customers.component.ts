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

  searchFormGroup: FormGroup;

  constructor() {
    this.searchFormGroup = this.fb.group({
      keyword:this.fb.control<string>(''),
    });
  }

  ngOnInit(): void {
   this.handleSearch();
  }


  handleSearch() {
    const keyword = this.searchFormGroup.value.keyword;
    this.customers = this.customerService.getCustomersByKeyword(keyword).pipe(
      catchError(error => {
        this.errorMessage = 'Error searching customers: ' + error.message;
        return of([]);
      })
    );
  }
}
