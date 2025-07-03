import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BankAccountService } from '../../../services/bank-account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';
import { Customer } from '../../../models/customer.model';

@Component({
  selector: 'app-new-bank-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-bank-account.component.html',
  styleUrl: './new-bank-account.component.css'
})
export class NewBankAccountComponent {
  bankAccountForm: FormGroup;
  showToast = false;
  successMessage = '';
  customerId!: number;
  customer?: Customer;

  constructor(
    private fb: FormBuilder,
    private bankAccountService: BankAccountService,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bankAccountForm = this.fb.group({
      type: ['', Validators.required],
      initialBalance: [null, [Validators.required, Validators.min(0)]],
      interestRate: [null,[Validators.required, Validators.min(0)]],
      overDraft: [null,[Validators.required, Validators.min(0)]]
    });

    // Reset irrelevant fields when type changes
    this.bankAccountForm.get('type')?.valueChanges.subscribe(type => {
      if (type === 'SavingAccount') {
        this.bankAccountForm.get('interestRate')?.setValidators([Validators.required, Validators.min(0)]);
        this.bankAccountForm.get('overDraft')?.clearValidators();
        this.bankAccountForm.get('overDraft')?.setValue(null);
      } else if (type === 'CurrentAccount') {
        this.bankAccountForm.get('overDraft')?.setValidators([Validators.required, Validators.min(0)]);
        this.bankAccountForm.get('interestRate')?.clearValidators();
        this.bankAccountForm.get('interestRate')?.setValue(null);
      }
      this.bankAccountForm.get('interestRate')?.updateValueAndValidity();
      this.bankAccountForm.get('overDraft')?.updateValueAndValidity();
    });

    // Get customer ID from route and fetch customer
    this.route.paramMap.subscribe(params => {
      this.customerId = Number(params.get('id'));
      if (this.customerId) {
        this.customerService.getCustomerById(this.customerId).subscribe({
          next: (data) => this.customer = data,
          error: () => this.customer = undefined
        });
      }
    });
  }

  onSubmit() {
    if (this.bankAccountForm.valid) {
      const formValue = this.bankAccountForm.value;
      // Attach customerId to the payload
      formValue.customerId = this.customerId;
      if (formValue.type === 'SavingAccount') {
        this.saveSaving(formValue);
      } else if (formValue.type === 'CurrentAccount') {
        this.saveCurrent(formValue);
      }
    } else {
      this.bankAccountForm.markAllAsTouched();
    }
  }

  saveSaving(formValue: any) {
    this.bankAccountService.saveSavingBankAccount(formValue).subscribe({
      next: () => {
        this.successMessage = 'Saving account created successfully!';
        this.showToast = true;
        this.bankAccountForm.reset();
        setTimeout(() => {
          this.showToast = false;
          this.router.navigate(['/accounts']);
        }, 1500);
      },
      error: (err) => {
        this.successMessage = 'Error creating saving account: ' + err.message;
        this.showToast = true;
      }
    });
  }

  saveCurrent(formValue: any) {
    this.bankAccountService.saveCurrentBankAccount(formValue).subscribe({
      next: () => {
        this.successMessage = 'Current account created successfully!';
        this.showToast = true;
        this.bankAccountForm.reset();
        setTimeout(() => {
          this.showToast = false;
          this.router.navigate(['/accounts']);
        }, 1500);
      },
      error: (err) => {
        this.successMessage = 'Error creating current account: ' + err.message;
        this.showToast = true;
      }
    });
  }

  goToCustomers() {
    this.router.navigate(['/customers']);
  }
}
