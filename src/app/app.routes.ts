import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component')
            .then(m => m.DashboardComponent), canActivate: [AuthGuard]
    },
    {
        path: 'add-expense', loadComponent: () => import('./pages/add-expense/add-expense.component')
            .then(m => m.AddExpenseComponent), canActivate: [AuthGuard]
    },
];
