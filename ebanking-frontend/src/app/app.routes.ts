import { Routes } from '@angular/router';
import { AccountsComponent } from './components/accounts/accounts/accounts.component';
import { CustomersComponent } from './components/customers/customers/customers.component';
import { NewCustomerComponent } from './components/customers/new-customer/new-customer.component';
import { UpdateCustomerComponent } from './components/customers/update-customer/update-customer.component';
import { ViewCustomerComponent } from './components/customers/view-customer/view-customer.component';

import { AccountOperationsComponent } from './components/accounts/account-operations/account-operations.component';
import { EditAccountComponent } from './components/accounts/edit-account/edit-account.component';
import { NewBankAccountComponent } from './components/accounts/new-bank-account/new-bank-account.component';
import { ViewAccountComponent } from './components/accounts/view-account/view-account.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    // {path: '/', component: LoginComponent,exact},
    { path: 'accounts', component: AccountsComponent },
    { path: 'accounts/:id/view', component: ViewAccountComponent },
    { path: 'accounts/:id/edit', component: EditAccountComponent },
    { path: 'accounts/:id/operations', component: AccountOperationsComponent },
    { path: 'customers/:id/new-bank-account', component: NewBankAccountComponent },
    { path: 'customers', component: CustomersComponent },
    { path: 'new-customer', component: NewCustomerComponent },
    { path: 'customers/:id/update', component: UpdateCustomerComponent },
    { path: 'customers/:id/view', component: ViewCustomerComponent },
    { path: 'customers/:id/accounts', component: AccountsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
      path:"",
      component:HomeComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' },
];
