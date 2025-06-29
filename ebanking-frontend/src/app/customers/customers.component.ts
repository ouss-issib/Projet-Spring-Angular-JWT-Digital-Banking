import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer.model';
import { catchError, Observable, of } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  showDeleteToast = false;
  deleteToastMessage = '';
  showUpdateToast = false;
  updateToastMessage = '';

  constructor(private router: Router) {
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

  onDelete(customer: Customer) {
    const response = confirm('Are you sure you want to delete this customer?');
    if (response) {
      this.customerService.deleteCustomer(customer.id).subscribe({
        next: () => {
          this.deleteToastMessage = 'Customer deleted successfully!';
          this.showDeleteToast = true;
          this.handleSearch();
          setTimeout(() => (this.showDeleteToast = false), 2000);
        },
        error: (error) => {
          this.errorMessage = 'Error deleting customer: ' + error.message;
          console.error(this.errorMessage);
        }
      });
    }
  }

  onUpdate(customer: Customer) {
    // this.updateToastMessage = 'Customer updated successfully!';
    // this.showUpdateToast = true;
    // setTimeout(() => (this.showUpdateToast = false), 2000);
    this.router.navigate(['/customers', customer.id, 'update']);
  }
}
