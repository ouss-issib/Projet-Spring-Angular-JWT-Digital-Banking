import { AccountOperation } from "../models/account-operation.model";


export interface AccountHistoryDTO {
     accountId: string;
     balance: number;
     currentPage: number;
     totalPages: number;
     pageSize: number;
     accountOperations : AccountOperation[];
}
