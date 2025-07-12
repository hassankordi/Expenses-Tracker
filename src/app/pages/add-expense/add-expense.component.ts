import { Component, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Select } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FileUploadModule } from 'primeng/fileupload';
import { CustomSafeHtmlPipe } from '../../shared/pipes/custom-safe-html.pipe';
import { HighlightIconsDirective } from '../../shared/directives/highlight-icons.directive';

@Component({
  selector: 'app-add-expense',
  imports: [ButtonModule, HighlightIconsDirective, ReactiveFormsModule, CustomSafeHtmlPipe, FileUploadModule, Select, InputNumberModule, DatePickerModule],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.scss'
})
export class AddExpenseComponent {

  selectedIcon: string = '';
  constructor(private apiService: ApiService, private router: Router) {
    this.getExchangeRates();
  }

  icons: any = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke = "currentColor" stroke - width="2" stroke - linecap="round" stroke - linejoin="round"class= "lucide lucide-fuel-icon lucide-fuel" >
    <line x1="3" x2 = "15" y1 = "22" y2 = "22" />
    <line x1="4" x2 = "14" y1 = "9" y2 = "9" />
    <path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18" />
    <path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5" />
    </svg>`,
    `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart-icon lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>`
    ,
    `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bus-icon lucide-bus"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/></svg>`,
    `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clapperboard-icon lucide-clapperboard"><path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z"/><path d="m6.2 5.3 3.1 3.9"/><path d="m12.4 3.4 3.1 4"/><path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/></svg>`
  ]
  expenseForm = new FormGroup({
    category: new FormControl('', Validators.required),
    amount: new FormControl(0, Validators.required),
    date: new FormControl(new Date(), Validators.required),
  })
  baseCurrency = signal({
    name: 'USD',
    code: 1
  });
  // exchangeRates: any = [];
  currencies: any = [];
  categories: string[] = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Other'];
  onSubmit() {
    debugger
    if (this.expenseForm.valid) {
      // convert the amount to the base currency usd
      const convertedAmount =
        (this.expenseForm.get('amount')?.value || 1) * this.baseCurrency().code;
      // update the total expenses in the ApiService
      this.apiService.totalExpenses.update(
        value => value + convertedAmount);

      this.apiService.items.update(items => [
        ...items, {
          expense: this.expenseForm.get('category')?.value || 'Other',
          amount: convertedAmount,
          date: (this.expenseForm.get('date')?.value || new Date()) as unknown as string,
          details: 'Expense details here...',
          icon: this.selectedIcon || " "
        }])

      this.router.navigate(['/dashboard']);
    } else {
      console.log('Form is invalid');
    }
  }
  getExchangeRates() {
    this.apiService.getCurrencyExchangeRates().subscribe(
      (data) => {
        this.currencies = data || [];
      },
      (error) => {
        console.error('Error fetching exchange rates:', error);
      }
    );
  }
  changeCurrency(event: any) {
    this.baseCurrency.set({
      name: event.originalEvent.target['ariaLabel'] || ' ',
      code: event.value || 1
    });
  }
  selectIcon(icon: any) {
    this.selectedIcon = icon;
  }
}
