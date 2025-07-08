import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountHistoryDTO } from '../../../dtos/AccountHistoryDTO';
import { BankAccount } from '../../../models/bank-account.model';
import { AuthService } from '../../../services/auth.service';
import { BankAccountService } from '../../../services/bank-account.service';

@Component({
  selector: 'app-account-operations',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './account-operations.component.html',
  styleUrls: ['./account-operations.component.css']
})
export class AccountOperationsComponent implements OnInit {
  authService = inject(AuthService);
  accountHistory?: AccountHistoryDTO;
  otherAccounts: BankAccount[] = [];
  errorMessage = '';
  operationMessage = '';
  page = 0;
  size = 5;

  // Débit
  debitAmount = 0;
  debitDescription = '';

  // Crédit
  creditAmount = 0;
  creditDescription = '';

  // Transfert
  transferAmount = 0;
  transferDescription = '';
  destinationAccountId = '';

  constructor(
    private route: ActivatedRoute,
    private bankAccountService: BankAccountService
  ) {}

  ngOnInit(): void {
    this.loadPage(0);
  }
  loadPage(page: number) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bankAccountService.getAccountHistory(id, page, this.size).subscribe({
        next: (history) => {
          // Trier ici les opérations
          history.accountOperations.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          this.accountHistory = history;
          this.page = history.currentPage;
          this.loadOtherAccounts(id);
        },
        error: () => this.errorMessage = 'Could not load operations'
      });
    }
  }

  loadOtherAccounts(currentId: string) {
    this.bankAccountService.getBankAccounts().subscribe({
      next: (accounts) => {
        this.otherAccounts = accounts.filter(acc => acc.id !== currentId);
      }
    });
  }

  handleDebit() {
    const accountId = this.accountHistory?.accountId;
    if (!accountId) return;
    this.bankAccountService.debit(accountId, this.debitAmount, this.debitDescription).subscribe({
      next: () => {
        this.operationMessage = 'Debit successful';
        this.loadPage(this.page);
        this.debitAmount = 0;
        this.debitDescription = '';
      },
      error: () => this.operationMessage = 'Error during debit operation'
    });
  }

  handleCredit() {
    const accountId = this.accountHistory?.accountId;
    if (!accountId) return;
    this.bankAccountService.credit(accountId, this.creditAmount, this.creditDescription).subscribe({
      next: () => {
        this.operationMessage = 'Credit successful';
        this.loadPage(this.page);
        this.creditAmount = 0;
        this.creditDescription = '';
      },
      error: () => this.operationMessage = 'Error during credit operation'
    });
  }

  handleTransfer() {
    const sourceId = this.accountHistory?.accountId;
    if (!sourceId || !this.destinationAccountId) return;
    this.bankAccountService.transfer(sourceId, this.destinationAccountId, this.transferAmount).subscribe({
      next: () => {
        this.operationMessage = 'Transfer successful';
        this.loadPage(this.page);
        this.transferAmount = 0;
        this.destinationAccountId = '';
      },
      error: () => this.operationMessage = 'Error during transfer operation'
    });
  }

  groupedAccounts() {
    return {
      Saving: this.otherAccounts.filter(acc => acc.type === 'SavingAccount'),
      Current: this.otherAccounts.filter(acc => acc.type === 'CurrentAccount'),
    };
  }

}
