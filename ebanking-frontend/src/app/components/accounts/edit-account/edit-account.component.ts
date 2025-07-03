import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BankAccountService } from '../../../services/bank-account.service';
import { BankAccountDTO } from '../../../dtos/BankAccountDTO';

@Component({
  selector: 'app-edit-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-account.component.html',
  styleUrl: './edit-account.component.css'
})
export class EditAccountComponent implements OnInit {
  accountForm!: FormGroup;
  accountId!: string;
  errorMessage = '';
  accountType: string = '';
  showSuccessToast = false;
  showErrorToast = false;
  successMessage = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private bankAccountService: BankAccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.accountId = this.route.snapshot.paramMap.get('id')!;
    this.bankAccountService.getBankAccountById(this.accountId).subscribe({
      next: (account) => {
        if (!account.type) {
          this.errorMessage = 'Unknown account type';
          return;
        }
        this.accountType = account.type;

        this.accountForm = this.fb.group({
          type: [account.type],
          balance: [account.balance, [Validators.required, Validators.min(0)]],
          status: [account.status, [Validators.required]],
          interestRate: [
            account.interestRate,
            account.type === 'SavingAccount'
              ? [Validators.required, Validators.min(0)]
              : []
          ],
          overDraft: [
            account.overDraft,
            account.type === 'CurrentAccount'
              ? [Validators.required, Validators.min(0)]
              : []
          ]
        });

        // Remove irrelevant controls for validation
        if (this.accountType === 'SavingAccount') {
          this.accountForm.get('overDraft')?.clearValidators();
          this.accountForm.get('overDraft')?.updateValueAndValidity();
        } else if (this.accountType === 'CurrentAccount') {
          this.accountForm.get('interestRate')?.clearValidators();
          this.accountForm.get('interestRate')?.updateValueAndValidity();
        }
      },
      error: () => this.errorMessage = 'Account not found'
    });
  }

  onSubmit() {
    if (this.accountForm.valid) {
      const updated: BankAccountDTO = {
        ...this.accountForm.value,
        id: this.accountId
      };
      if (this.accountType === 'SavingAccount') {
        delete updated.overDraft;
      } else if (this.accountType === 'CurrentAccount') {
        delete updated.interestRate;
      }
      this.bankAccountService.updateBankAccount(updated).subscribe({
        next: () => {
          this.successMessage = 'Account updated successfully!';
          this.showSuccessToast = true;
          setTimeout(() => {
            this.showSuccessToast = false;
            this.router.navigate(['/accounts', this.accountId, 'view']);
          }, 2000);
        },
        error: (err) => {
          this.errorMessage = 'Update failed: ' + err.message;
          this.showErrorToast = true;
          setTimeout(() => (this.showErrorToast = false), 3000);
        }
      });
    } else {
      this.accountForm.markAllAsTouched();
    }
  }
}
