import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FormatCurrencyService } from 'src/app/services/module-utilities/format-currency/format-currency.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {

  constructor(
    private formatCurrency: FormatCurrencyService
  ) { }

  productForm = new FormGroup({
    productCode: new FormControl(''),
    productName: new FormControl('', Validators.required),
    productType: new FormControl(''),
    price: new FormControl(0.00),
    description: new FormControl(''),
  })

}
