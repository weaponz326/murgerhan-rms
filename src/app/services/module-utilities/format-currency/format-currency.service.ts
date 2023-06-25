import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatCurrencyService {

  constructor() { }

  formatNumberValue(currency: number) {
    return parseFloat(currency.toFixed(2));
  }

}
