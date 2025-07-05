import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BankAccount } from '../models/bank-account.model';
import { Observable } from 'rxjs';
import { SavingAccountRequestDTO } from '../dtos/SavingAccountRequestDTO';
import { CurrentAccountRequestDTO } from '../dtos/CurrentAccountRequestDTO';
import { BankAccountDTO } from '../dtos/BankAccountDTO';
import { AccountHistoryDTO } from '../dtos/AccountHistoryDTO';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  backendUrl = environment.baseUrl + '/accounts';
  private http = inject(HttpClient);

  getBankAccounts(): Observable<BankAccount[]> {
    return this.http.get<BankAccount[]>(`${this.backendUrl}`);
  }

  getBankAccountById(id: string): Observable<BankAccountDTO> {
    return this.http.get<BankAccountDTO>(`${this.backendUrl}/${id}`);
  }

  getBankAccountsByCustomerId(customerId: number): Observable<BankAccount[]> {
    return this.http.get<BankAccount[]>(`${this.backendUrl}/by-customer/${customerId}`);
  }

  saveSavingBankAccount(savingBankAccountDTO: SavingAccountRequestDTO): Observable<SavingAccountRequestDTO> {
    return this.http.post<SavingAccountRequestDTO>(`${this.backendUrl}/saving`, savingBankAccountDTO);
  }

  saveCurrentBankAccount(currentBankAccountDTO: CurrentAccountRequestDTO): Observable<CurrentAccountRequestDTO> {
    return this.http.post<CurrentAccountRequestDTO>(`${this.backendUrl}/current`, currentBankAccountDTO);
  }

  updateBankAccount(bankAccountDTO: BankAccountDTO): Observable<BankAccountDTO> {
    return this.http.put<BankAccountDTO>(`${this.backendUrl}/${bankAccountDTO.id}`, bankAccountDTO);
  }

  deleteBankAccount(id: string): Observable<void> {
    return this.http.delete<void>(`${this.backendUrl}/${id}`);
  }


  getAccountHistory(accountId: string, page: number, size: number): Observable<AccountHistoryDTO> {
    return this.http.get<AccountHistoryDTO>(
      `${this.backendUrl}/${accountId}/pageOperations?page=${page}&size=${size}`
    );
  }

  debit(accountId: string, amount: number, description: string): Observable<void> {
    return this.http.post<void>(`${this.backendUrl}/debit`, {
      accountId, amount, description
    });
  }

  transfer(sourceId: string, destId: string, amount: number): Observable<void> {
    return this.http.post<void>(`${this.backendUrl}/transfer`, {
      sourceAccount: sourceId,
      destinationAccount: destId,
      amount
    });
  }


  getAllAccountsExcept(currentId: string): Observable<BankAccountDTO[]> {
    return this.http.get<BankAccountDTO[]>(`${this.backendUrl}/others/${currentId}`);
  }

  credit(accountId: string, amount: number, description: string): Observable<void> {
    return this.http.post<void>(`${this.backendUrl}/credit`, {
      accountId, amount, description
    });
  }

}
