import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankAccount } from '../../../models/bank-account.model';
import { BankAccountService } from '../../../services/bank-account.service';
import { catchError, Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accounts!: Observable<BankAccount[]>;
  errorMessage!: string;
  bankAccountService = inject(BankAccountService);
  customerId?: number;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.customerId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.customerId && !isNaN(this.customerId)) {
      this.getBankAccountsByCustomer(this.customerId);
    } else {
      this.getBankAccounts();
    }
  }

  getBankAccountsByCustomer(id: number) {
    this.accounts = this.bankAccountService.getBankAccountsByCustomerId(id).pipe(
      catchError(error => {
        this.errorMessage = 'Error fetching accounts: ' + error.message;
        return of([]);
      })
    );
  }

  getBankAccounts() {
    this.accounts = this.bankAccountService.getBankAccounts().pipe(
      catchError(error => {
        this.errorMessage = 'Error fetching accounts: ' + error.message;
        return of([]);
      })
    );
  }

  onNewAccount() {
    this.router.navigateByUrl("new-bank-account");
  }

  onView(account: BankAccount) {
    // Navigate to the account details page
    this.router.navigate(['/accounts', account.id, 'view']);
  }

  onEdit(account: BankAccount) {
    // Navigate to the account edit page
    this.router.navigate(['/accounts', account.id, 'edit']);
  }

  onDelete(account: BankAccount) {
    if (confirm('Are you sure you want to delete this account?')) {
      this.bankAccountService.deleteBankAccount(account.id).subscribe({
        next: () => {
          // Refresh the list after deletion
          if (this.customerId && !isNaN(this.customerId)) {
            this.getBankAccountsByCustomer(this.customerId);
          } else {
            this.getBankAccounts();
          }
        },
        error: (err) => {
          this.errorMessage = 'Error deleting account: ' + err.message;
        }
      });
    }
  }

  onViewOperations(account: BankAccount) {
    // Navigate to the operations/transactions page for this account
    this.router.navigate(['/accounts', account.id, 'operations']);
  }
}
