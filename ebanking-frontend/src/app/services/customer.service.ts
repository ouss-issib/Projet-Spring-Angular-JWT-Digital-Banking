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

}


