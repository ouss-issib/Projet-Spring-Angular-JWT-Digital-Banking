import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BankAccountService } from '../../../services/bank-account.service';
import { BankAccountDTO } from '../../../dtos/BankAccountDTO';

@Component({
  selector: 'app-view-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-account.component.html',
  styleUrls: ['./view-account.component.css']
})
export class ViewAccountComponent implements OnInit {
  account?: BankAccountDTO;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private bankAccountService: BankAccountService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bankAccountService.getBankAccountById(id).subscribe({
        next: (data) => this.account = data,
        error: (err) => this.errorMessage = 'Account not found'
      });
    }
  }
}
