import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { serverTimestamp } from 'firebase/firestore';

import { PurchasingItem } from 'src/app/models/modules/inventory/inventory.model';

import { PurchasingItemFormComponent } from '../purchasing-item-form/purchasing-item-form.component';


@Component({
  selector: 'app-add-purchasing-item',
  templateUrl: './add-purchasing-item.component.html',
  styleUrls: ['./add-purchasing-item.component.scss']
})
export class AddPurchasingItemComponent {

  @Output() saveItemEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('purchasingItemFormComponentReference', { read: PurchasingItemFormComponent, static: false }) purchasingItemForm!: PurchasingItemFormComponent;

  isItemSaving = false;

  selectedProductData: any;

  openModal(lastId: any){
    this.purchasingItemForm.purchasingItemForm.controls.itemNumber.setValue(lastId + 1);
    this.purchasingItemForm.purchasingItemForm.controls.unitPrice.setValue(0.00);
    this.purchasingItemForm.purchasingItemForm.controls.quantity.setValue(1);

    this.addButton.nativeElement.click();
  }

  saveItem(){
    let data: PurchasingItem = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      item_number: this.purchasingItemForm.purchasingItemForm.controls.itemNumber.value as number,
      purchasing: sessionStorage.getItem('inventory_purchasing_id') as string,
      quantity: this.purchasingItemForm.purchasingItemForm.controls.quantity.value as number,
      stock_item: {
        id: this.selectedProductData.id,
        data: {
          item_code: this.selectedProductData.data.product_code,
          item_name: this.selectedProductData.data.product_name,
          unit_price: this.selectedProductData.data.price,
        }
      },
    }

    if(this.selectedProductData.id != "")
      this.saveItemEvent.emit(data);
  }

  resetForm(){
    this.purchasingItemForm.purchasingItemForm.controls.itemNumber.setValue(null);
    this.purchasingItemForm.purchasingItemForm.controls.itemCode.setValue('');
    this.purchasingItemForm.purchasingItemForm.controls.itemName.setValue('');
    this.purchasingItemForm.purchasingItemForm.controls.unitPrice.setValue(0.00);
    this.purchasingItemForm.purchasingItemForm.controls.quantity.setValue(1);
    this.selectedProductData = null;
  }
  
}
