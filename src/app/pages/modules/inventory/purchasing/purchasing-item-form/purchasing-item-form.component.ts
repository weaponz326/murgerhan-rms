import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-purchasing-item-form',
  templateUrl: './purchasing-item-form.component.html',
  styleUrls: ['./purchasing-item-form.component.scss']
})
export class PurchasingItemFormComponent {

  purchasingItemForm = new FormGroup({
    itemNumber: new FormControl(),
    itemCode: new FormControl(),
    itemName: new FormControl(''),
    unitPrice: new FormControl(0.00),
    quantity: new FormControl(1),
  })
  
}
