import { OperationType } from "../enums/OperationType";

export interface AccountOperation {
    id : number;
    date : Date;
    amount : number;
    operationType : OperationType;
    description : String;
}
