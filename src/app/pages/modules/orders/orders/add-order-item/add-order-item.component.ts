import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { serverTimestamp } from 'firebase/firestore';

import { OrderItem } from 'src/app/models/modules/orders/orders.model';

import { OrderItemFormComponent } from '../order-item-form/order-item-form.component';


@Component({
  selector: 'app-add-order-item',
  templateUrl: './add-order-item.component.html',
  styleUrls: ['./add-order-item.component.scss']
})
export class AddOrderItemComponent {

  @Output() saveItemEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('orderItemFormComponentReference', { read: OrderItemFormComponent, static: false }) orderItemForm!: OrderItemFormComponent;

  isItemSaving = false;

  selectedProductData: any;

  openModal(lastId: any){
    this.orderItemForm.orderItemForm.controls.itemNumber.setValue(lastId + 1);
    this.orderItemForm.orderItemForm.controls.price.setValue(0.00);
    this.orderItemForm.orderItemForm.controls.quantity.setValue(1);

    this.addButton.nativeElement.click();
  }

  saveItem(){
    let data: OrderItem = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      item_number: this.orderItemForm.orderItemForm.controls.itemNumber.value as number,
      order: sessionStorage.getItem('orders_order_id') as string,
      quantity: this.orderItemForm.orderItemForm.controls.quantity.value as number,
      product: {
        id: this.selectedProductData.id,
        data: {
          product_code: this.selectedProductData.data.product_code,
          product_name: this.selectedProductData.data.product_name,
          price: this.selectedProductData.data.price,
        }
      },
    }

    if(this.selectedProductData.id != "")
      this.saveItemEvent.emit(data);
  }

  resetForm(){
    this.orderItemForm.orderItemForm.controls.itemNumber.setValue(null);
    this.orderItemForm.orderItemForm.controls.productCode.setValue('');
    this.orderItemForm.orderItemForm.controls.productName.setValue('');
    this.orderItemForm.orderItemForm.controls.price.setValue(0.00);
    this.orderItemForm.orderItemForm.controls.quantity.setValue(1);
    this.selectedProductData = null;
  }

}
