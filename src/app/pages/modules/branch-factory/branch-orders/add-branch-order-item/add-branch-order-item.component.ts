import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { serverTimestamp } from 'firebase/firestore';

import { FactoryOrderItem } from 'src/app/models/modules/factory/factory.model';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { BranchOrderItemFormComponent } from '../branch-order-item-form/branch-order-item-form.component';
// import { SelectFactoryItemComponent } from 'src/app/components/select-windows/factory-windows/select-factory-item/select-factory-item.component';


@Component({
  selector: 'app-add-branch-order-item',
  templateUrl: './add-branch-order-item.component.html',
  styleUrls: ['./add-branch-order-item.component.scss']
})
export class AddBranchOrderItemComponent {

  constructor(
    private formatId: FormatIdService,
  ) { }

  @Output() saveItemEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('branchOrderItemFormComponentReference', { read: BranchOrderItemFormComponent, static: false }) orderItemForm!: BranchOrderItemFormComponent;
  // @ViewChild('selectFactoryItemComponentReference', { read: SelectFactoryItemComponent, static: false }) selectFactoryItem!: SelectFactoryItemComponent;

  isItemSaving = false;

  selectedItemId: any;
  selectedItemData: any;

  openModal(lastId: any){
    this.orderItemForm.orderItemForm.controls.itemNumber.setValue(lastId + 1);
    this.orderItemForm.orderItemForm.controls.price.setValue(0.00);
    this.orderItemForm.orderItemForm.controls.quantity.setValue(1);

    this.addButton.nativeElement.click();
  }

  saveItem(){
    this.orderItemForm.isSaved = true;    

    if(this.orderItemForm.orderItemForm.valid && this.selectedItemId){
      let data: FactoryOrderItem = {
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
        item_number: this.orderItemForm.orderItemForm.controls.itemNumber.value as number,
        order: sessionStorage.getItem('factory_order_id') as string,
        quantity: this.orderItemForm.orderItemForm.controls.quantity.value as number,
        factory_item: {
          id: this.selectedItemId,
          data: {
            item_code: this.selectedItemData.item_code,
            item_name: this.selectedItemData.item_name,
            price: this.selectedItemData.price,
          }
        },
      }
      
      this.saveItemEvent.emit(data);
    }
  }

  resetForm(){
    this.orderItemForm.orderItemForm.controls.itemNumber.setValue(null);
    this.orderItemForm.orderItemForm.controls.itemCode.setValue('');
    this.orderItemForm.orderItemForm.controls.itemName.setValue('');
    this.orderItemForm.orderItemForm.controls.price.setValue(0.00);
    this.orderItemForm.orderItemForm.controls.quantity.setValue(1);
    this.selectedItemId = null;
    this.selectedItemData = null;
  }

  openFactoryItemWindow(){
    // // console.log("You are opening select item window")
    // this.selectFactoryItem.openModal();
  }

  onFactoryItemSelected(itemData: any){
    // console.log(itemData);

    this.selectedItemData = itemData;
    this.orderItemForm.orderItemForm.controls.itemCode.setValue(this.formatId.formatId(itemData.data().item_code, 4, "#", "FI"));
    this.orderItemForm.orderItemForm.controls.itemName.setValue(itemData.data().item_name);
    this.orderItemForm.orderItemForm.controls.price.setValue(itemData.data().price);

    this.selectedItemId = itemData.id;
    this.selectedItemData = itemData.data();
  }

}
