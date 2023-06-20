import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { serverTimestamp } from 'firebase/firestore';

import { PurchasingItem } from 'src/app/models/modules/inventory/inventory.model';

import { PurchasingItemFormComponent } from '../purchasing-item-form/purchasing-item-form.component';


@Component({
  selector: 'app-edit-purchasing-item',
  templateUrl: './edit-purchasing-item.component.html',
  styleUrls: ['./edit-purchasing-item.component.scss']
})
export class EditPurchasingItemComponent {

  @Output() saveItemEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('purchasingItemFormComponentReference', { read: PurchasingItemFormComponent, static: false }) purchasingItemForm!: PurchasingItemFormComponent;

  purchasingItemData: any;
  selectedProductData: any;

  isItemSaving = false;

  ngOnInit(): void {
  }

  openModal(data: any){
    this.purchasingItemData = data;
    this.setPurchasingItemData(data);

    this.editButton.nativeElement.click();
  }

  saveItem(){
    let data: PurchasingItem = {
      created_at: this.purchasingItemData.data().created_at,
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

    let item = {
      id: this.purchasingItemData.id,
      data: data
    }

    this.saveItemEvent.emit(item);
  }

  setPurchasingItemData(data: any){
    this.purchasingItemForm.purchasingItemForm.controls.itemNumber.setValue(data.item_number);
    this.purchasingItemForm.purchasingItemForm.controls.itemCode.setValue(data.product?.product_code);
    this.purchasingItemForm.purchasingItemForm.controls.itemName.setValue(data.product?.product_name);
    this.purchasingItemForm.purchasingItemForm.controls.unitPrice.setValue(data.product.price);
    this.purchasingItemForm.purchasingItemForm.controls.quantity.setValue(data.quantity);
    this.selectedProductData = data.product;
  }
  
}
