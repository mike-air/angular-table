import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthGuard } from './utils/guards/auth.guard';
import { TransactionComponent } from './transaction/transaction.component';
import { VendorComponent } from './vendor/vendor.component';
import { ActivityLogComponent } from './activitylog/activityLog.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard], // Apply AuthGuard to login route
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: TransactionComponent },
      { path: 'transactions', component: TransactionComponent },
      { path: 'vendors', component: VendorComponent },
      { path: 'activity', component: ActivityLogComponent },
    ],
  },
  { path: '**', component: NotFoundComponent }, // Route for handling 404
];
