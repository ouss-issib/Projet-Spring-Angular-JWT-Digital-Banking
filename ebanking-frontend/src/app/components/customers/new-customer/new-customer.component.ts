import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-new-customer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent {
  customerForm: FormGroup;
  customerService = inject(CustomerService);
  successMessage!: string ;
  errorMessage!: string ;
  showToast = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.customerForm = this.fb.group({
      name: ['',[ Validators.required,Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.customerForm.valid) {
      this.customerService.saveNewCustomer(this.customerForm.value).subscribe({
        next: (customer) => {
          this.successMessage = 'Customer saved successfully!';
          this.showToast = true;
          this.customerForm.reset();
          setTimeout(() => {
            this.showToast = false;
            this.successMessage = '';
            this.errorMessage = '';
            // Navigate to customers list after a short delay
            this.router.navigate(['/customers'])
          }, 1500);
        },
        error: (error) => {
          this.errorMessage = 'Error saving customer:'+ error.message;
        }
      })
    } else {
      this.customerForm.markAllAsTouched();
    }
  }
}
