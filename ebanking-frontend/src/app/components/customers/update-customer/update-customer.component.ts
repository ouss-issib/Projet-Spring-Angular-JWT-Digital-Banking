import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../../services/customer.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-customer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {
  customerForm!: FormGroup;
  customerId!: number;

  successMessage: string = '';
  errorMessage: string = '';
  showToast: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerId = +this.route.snapshot.paramMap.get('id')!;
    this.customerService.getCustomerById(this.customerId).subscribe(customer => {
      this.customerForm = this.fb.group({
        name: [customer.name, [Validators.required, Validators.minLength(3)]],
        email: [customer.email, [Validators.required, Validators.email]]
      });
    });
  }

  onSubmit() {
    if (this.customerForm.valid) {
       // Add the customer ID to the form value
      this.customerForm.value.id = this.customerId;
      // Call the updateCustomer method from the service
      this.customerService.updateCustomer(this.customerForm.value).subscribe({
        next: () => {
          this.successMessage = 'Customer updated successfully!';
          this.showToast = true;
          this.customerForm.reset();
          setTimeout(() => {
            this.showToast = false;
            this.successMessage = '';
            this.errorMessage = '';
            // Navigate to customers list after a short delay
            this.router.navigate(['/customers']);
          }, 1500);
        }
        , error: (err) => {
          this.errorMessage = 'Error updating customer: ' + err.message;
          this.showToast = true;
        }
    })

    } else {
      this.customerForm.markAllAsTouched();
    }
  }
}

// }
