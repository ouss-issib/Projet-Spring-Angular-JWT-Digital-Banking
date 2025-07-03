import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BankAccountService } from '../../../services/bank-account.service';
import { AccountHistoryDTO } from '../../../dtos/AccountHistoryDTO';

@Component({
  selector: 'app-account-operations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account-operations.component.html',
  styleUrls: ['./account-operations.component.css']
})
export class AccountOperationsComponent implements OnInit {
  accountHistory?: AccountHistoryDTO;
  errorMessage = '';
  page = 0;
  size = 5;

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
          this.accountHistory = history;
          this.page = history.currentPage;
        },
        error: () => this.errorMessage = 'Could not load operations'
      });
    }
  }
}
