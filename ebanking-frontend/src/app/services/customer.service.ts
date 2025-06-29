import { HttpClient } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private http = inject(HttpClient);

  getCustomers():Observable<Customer[]>{
    return this.http.get<Customer[]>(`http://localhost:9090/customers`);
  }



}


