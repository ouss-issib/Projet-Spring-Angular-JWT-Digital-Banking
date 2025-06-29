import { Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { AccountsComponent } from './accounts/accounts.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';

export const routes: Routes = [
    { path: 'customers', component : CustomersComponent },
    { path: 'accounts', component : AccountsComponent },
    { path: 'new-customer', component:NewCustomerComponent },
    { path: 'customers/:id/update', component: UpdateCustomerComponent },
    { path: 'customers/:id/view', component: ViewCustomerComponent }
];
