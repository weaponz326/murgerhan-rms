import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {

  productForm = new FormGroup({
    productCode: new FormControl(''),
    productName: new FormControl(''),
    productType: new FormControl(''),
    price: new FormControl(),
    description: new FormControl(''),
  })

}
