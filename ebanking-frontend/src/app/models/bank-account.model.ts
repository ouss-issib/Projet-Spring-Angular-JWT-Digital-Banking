import { AccountStatus } from "../enums/AccountStatus";
import { Customer } from "./customer.model";

export type AccountType = 'SavingAccount' | 'CurrentAccount';

export interface BaseAccount {
  id: string;
  createdAt: Date;
  balance: number;
  status: AccountStatus;
  customerDTO: Customer;
  type: AccountType;
}

export interface SavingAccount extends BaseAccount {
  type: 'SavingAccount';
  interestRate: number; // Only for saving accounts
}

export interface CurrentAccount extends BaseAccount {
  type: 'CurrentAccount';
  overDraft: number; // Only for current accounts
}

// Union type for all possible accounts
export type BankAccount = SavingAccount | CurrentAccount;
