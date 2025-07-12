import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { map, Observable, share, shareReplay } from 'rxjs';
export interface ExpenseItem {
  expense: string;
  amount: number;
  date: string;
  details: string;
  icon: string;
}
@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  totalExpenses = signal(100);
  items = signal<ExpenseItem[]>([
    {
      expense: 'Food',
      amount: 100,
      date: new Date().toISOString(),
      details: 'Food expense details here...',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="lucide lucide-shopping-cart-icon lucide-shopping-cart">
                                    <circle cx="8" cy="21" r="1" />
                                    <circle cx="19" cy="21" r="1" />
                                    <path
                                        d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                                </svg>`
    }
  ]);

  // this method fetches the currency exchange rates from an external API
  // and returns an observable that can be subscribed to
  // sharereply cuz the data is not changing frequently
  // and cashe improve performance 
  getCurrencyExchangeRates(): Observable<any> {
    return this.http.get
      ('https://v6.exchangerate-api.com/v6/c5492235d91e05a9d9afc735/latest/USD')
      .pipe(shareReplay(1), map((result: any) => {
        const currencies: any[] = [];
        for (const key in result.conversion_rates) {
          currencies.push({ name: key, code: result.conversion_rates[key] });
        }
        return currencies;
      }));
  }
}
