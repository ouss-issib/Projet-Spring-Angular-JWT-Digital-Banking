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
import { AdminTemplateComponent } from './components/admin-template/admin-template.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { authorizationGuard } from './guards/authorization.guard';
import { RedirectIfAuthenticatedGuard } from './guards/redirect-if-authenticated.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent  , canActivate: [RedirectIfAuthenticatedGuard]
    },
    { path:'', redirectTo: '/login', pathMatch: 'full'},
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },
    {
      path: 'admin',
      component: AdminTemplateComponent,
      canActivate:[AuthenticationGuard] ,
      children: [
        { path: '', component: HomeComponent },
        { path: 'accounts', component: AccountsComponent },
        { path: 'accounts/:id/view', component: ViewAccountComponent },
        { path: 'accounts/:id/edit', component: EditAccountComponent ,canActivate:[authorizationGuard],data: { roles: ['ADMIN'] }},
        { path: 'accounts/:id/operations', component: AccountOperationsComponent },
        { path: 'customers/:id/new-bank-account', component: NewBankAccountComponent ,canActivate:[authorizationGuard],data: { roles: ['ADMIN'] }},
        { path: 'customers', component: CustomersComponent },
        { path: 'new-customer', component: NewCustomerComponent ,canActivate:[authorizationGuard],data: { roles: ['ADMIN'] }},
        { path: 'customers/:id/update', component: UpdateCustomerComponent ,canActivate:[authorizationGuard],data: { roles: ['ADMIN'] }},
        { path: 'customers/:id/view', component: ViewCustomerComponent },
        { path: 'customers/:id/accounts', component: AccountsComponent },
        { path: 'not-authorized', component: NotAuthorizedComponent },
      ]
    },
];
