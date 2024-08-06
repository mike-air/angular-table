import { Routes } from '@angular/router';

import { AuthGuard } from './utils/guards/auth.guard';
import { TransactionComponent } from './transaction/transaction.component';

import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: TransactionComponent },
      { path: 'transactions', component: TransactionComponent },
    ],
  },
  { path: '**', component: NotFoundComponent }, // Route for handling 404
];
