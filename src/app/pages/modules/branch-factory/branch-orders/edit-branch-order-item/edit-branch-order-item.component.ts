import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { serverTimestamp } from 'firebase/firestore';

import { FactoryOrderItem } from 'src/app/models/modules/factory/factory.model';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { BranchOrderItemFormComponent } from '../branch-order-item-form/branch-order-item-form.component';
// import { SelectFactoryItemComponent } from 'src/app/components/select-windows/factory-windows/select-factory-item/select-factory-item.component';


@Component({
  selector: 'app-edit-branch-order-item',
  templateUrl: './edit-branch-order-item.component.html',
  styleUrls: ['./edit-branch-order-item.component.scss']
})
export class EditBranchOrderItemComponent {

  constructor(
    private formatId: FormatIdService,
  ) { }

  @Output() saveItemEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('branchOrderItemFormComponentReference', { read: BranchOrderItemFormComponent, static: false }) orderItemForm!: BranchOrderItemFormComponent;
  // @ViewChild('selectFactoryItemComponentReference', { read: SelectFactoryItemComponent, static: false }) selectFactoryItem!: SelectFactoryItemComponent;

  orderItemData: any;
  
  selectedItemId: any;
  selectedItemData: any;

  isItemSaving = false;

  ngOnInit(): void {
  }

  openModal(data: any){
    this.orderItemData = data;
    this.setOrderItemData(data);

    this.editButton.nativeElement.click();
  }

  saveItem(){
    this.orderItemForm.isSaved = true;        

    if(this.orderItemForm.orderItemForm.valid && this.selectedItemId){
      let data: FactoryOrderItem = {
        created_at: this.orderItemData.data().created_at,
        updated_at: serverTimestamp(),
        quantity: this.orderItemForm.orderItemForm.controls.quantity.value as number,
        order: {
          id: sessionStorage.getItem('factory_order_id') as string,
          data: {
            order_date: this.orderItemData.data().order.data.order_date,
            order_code: this.orderItemData.data().order.data.order_code,
            branch: {
              id: this.orderItemData.data().order.data.branch.id,
              data: {
                branch_name: this.orderItemData.data().order.data.branch.data.branch_name,
                location: this.orderItemData.data().order.data.branch.data.location,
              }
            },
          }
        },
        factory_item: {
          id: this.selectedItemId,
          data: {
            item_code: this.selectedItemData.item_code,
            item_name: this.selectedItemData.item_name,
            price: this.selectedItemData.price,
          }
        },
      }
  
      let item = {
        id: this.orderItemData.id,
        data: data
      }
      
      this.saveItemEvent.emit(item);
    }
  }

  setOrderItemData(data: any){
    this.orderItemForm.orderItemForm.controls.itemCode.setValue(this.formatId.formatId(data.data().factory_item?.data.item_code, 4, "#", "FI"));
    this.orderItemForm.orderItemForm.controls.itemName.setValue(data.data().factory_item?.data.item_name);
    this.orderItemForm.orderItemForm.controls.price.setValue(data.data().factory_item.data.price);
    this.orderItemForm.orderItemForm.controls.quantity.setValue(data.data().quantity);

    this.selectedItemId = data.data().factory_item.id;
    this.selectedItemData = data.data().factory_item.data;
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
