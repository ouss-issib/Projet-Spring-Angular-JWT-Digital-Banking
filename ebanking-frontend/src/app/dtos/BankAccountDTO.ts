import { AccountStatus } from "../enums/AccountStatus";
import { Customer } from "../models/customer.model";



export interface BankAccountDTO {
  id: string;
  createdAt: Date;
  balance: number;
  status: AccountStatus;
  customerDTO: Customer;
  type: string;
  interestRate?: number;
  overDraft?: number;
}
