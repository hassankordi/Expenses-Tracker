import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { Select } from 'primeng/select';
import { ApiService } from '../../services/api.service';
import { CustomSafeHtmlPipe } from '../../shared/pipes/custom-safe-html.pipe';
export interface balance {
  totalBalance: number;
  // totalExpense: number;
  totalIncome: number;
}



@Component({
  selector: 'app-dashboard',
  imports: [AvatarModule, AvatarGroupModule, DatePipe, CustomSafeHtmlPipe, Select, FormsModule, CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent {
  userName: string = 'Hassan Kordi';
  apiService: ApiService = inject(ApiService);
  dates: any[] | undefined;
  items = this.apiService.items;
  selectedDate: any | undefined = { name: 'This Month', code: '30' };

  initialBalance: balance = {
    totalBalance: 2548,
    totalIncome: 10840
  }
  // Using signal for reactive state management
  balance: WritableSignal<balance> = signal(this.initialBalance);

  totalExpense = this.apiService.totalExpenses;
  ngOnInit() {
    this.dates = [
      { name: 'This Month', code: '30' },
      { name: 'This week', code: '7' },
      { name: 'Today', code: '1' },

    ];
  }
}
// Removed conflicting local signal function implementation

