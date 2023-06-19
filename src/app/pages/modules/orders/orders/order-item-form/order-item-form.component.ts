import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-order-item-form',
  templateUrl: './order-item-form.component.html',
  styleUrls: ['./order-item-form.component.scss']
})
export class OrderItemFormComponent {

  orderItemForm = new FormGroup({
    itemNumber: new FormControl(),
    productCode: new FormControl(),
    productName: new FormControl(''),
    price: new FormControl(0.00),
    quantity: new FormControl(1),
  })
  
}
