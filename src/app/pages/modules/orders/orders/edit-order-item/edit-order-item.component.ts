import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { serverTimestamp } from 'firebase/firestore';

import { OrderItem } from 'src/app/models/modules/orders/orders.model';

import { OrderItemFormComponent } from '../order-item-form/order-item-form.component';


@Component({
  selector: 'app-edit-order-item',
  templateUrl: './edit-order-item.component.html',
  styleUrls: ['./edit-order-item.component.scss']
})
export class EditOrderItemComponent {

  @Output() saveItemEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('orderItemFormComponentReference', { read: OrderItemFormComponent, static: false }) orderItemForm!: OrderItemFormComponent;

  orderItemData: any;
  selectedProductData: any;

  isItemSaving = false;

  ngOnInit(): void {
  }

  openModal(data: any){
    this.orderItemData = data;
    this.setOrderItemData(data);

    this.editButton.nativeElement.click();
  }

  saveItem(){
    let data: OrderItem = {
      created_at: this.orderItemData.data().created_at,
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

    let item = {
      id: this.orderItemData.id,
      data: data
    }

    this.saveItemEvent.emit(item);
  }

  setOrderItemData(data: any){
    this.orderItemForm.orderItemForm.controls.itemNumber.setValue(data.item_number);
    this.orderItemForm.orderItemForm.controls.productCode.setValue(data.product?.product_code);
    this.orderItemForm.orderItemForm.controls.productName.setValue(data.product?.product_name);
    this.orderItemForm.orderItemForm.controls.price.setValue(data.product.price);
    this.orderItemForm.orderItemForm.controls.quantity.setValue(data.quantity);
    this.selectedProductData = data.product;
  }
  
}
