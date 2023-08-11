import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {

  constructor() { }

  isSaved = false;

  productForm = new FormGroup({
    productCode: new FormControl({value: '', disabled: true}),
    productName: new FormControl('', Validators.required),
    productType: new FormControl(''),
    price: new FormControl(0.00),
    vat: new FormControl(0.00),
    description: new FormControl(''),
  })

}
