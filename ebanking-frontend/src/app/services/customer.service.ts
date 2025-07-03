import { HttpClient } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  backendUrl = environment.baseUrl + '/customers';
  private http = inject(HttpClient);

  getCustomers():Observable<Customer[]>{
    return this.http.get<Customer[]>(`${this.backendUrl}`);
  }

  getCustomersByKeyword(keyword: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.backendUrl}/search?keyword=${keyword}`);
  }

  saveNewCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.backendUrl}`, customer);
  }

  deleteCustomer(customerId: number): Observable<void> {
    return this.http.delete<void>(`${this.backendUrl}/${customerId}`);
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.backendUrl}/${customer.id}`, customer);
  }

  getCustomerById(customerId:number): Observable<Customer>{
    return this.http .get<Customer>(`${this.backendUrl}/${customerId}`);
  }


}


