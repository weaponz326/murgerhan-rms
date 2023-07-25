import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';
import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';

import { DeleteModalTwoComponent } from 'src/app/components/module-utilities/delete-modal-two/delete-modal-two.component';
import { AddBranchOrderItemComponent } from '../add-branch-order-item/add-branch-order-item.component';
import { EditBranchOrderItemComponent } from '../edit-branch-order-item/edit-branch-order-item.component';
import { FactoryApiService } from 'src/app/services/modules-api/factory-api/factory-api.service';


@Component({
  selector: 'app-branch-order-items',
  templateUrl: './branch-order-items.component.html',
  styleUrls: ['./branch-order-items.component.scss']
})
export class BranchOrderItemsComponent {

  constructor(
    private router: Router,
    private factoryApi: FactoryApiService,
  ) { }

  @Output() setOrderTotal = new EventEmitter<any>();

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModal!: DeleteModalTwoComponent;
  @ViewChild('addBranchOrderItemComponentReference', { read: AddBranchOrderItemComponent, static: false }) addOrderItem!: AddBranchOrderItemComponent;
  @ViewChild('editBranchOrderItemComponentReference', { read: EditBranchOrderItemComponent, static: false }) editOrderItem!: EditBranchOrderItemComponent;
  
  orderItemListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  deleteId = "";
  isItemDeleting = false;

  totalPrice: number = 0.00;
  lastItem = 0;

  ngOnInit(): void {
    this.getOrderItemList();
  }

  calculateTotalPrice(){
    this.totalPrice = 0;
    for (let item of this.orderItemListData){
      this.totalPrice += item.data().factory_item.data.price * item.data().quantity;
    }

    this.patchTotalAmount();
    this.setOrderTotal.emit(this.totalPrice);
    // console.log(this.totalPrice);
  }

  getOrderItemList(){
    this.isFetchingData = true;

    this.factoryApi.getBranchOrderItemList()
      .then(
        (res: any) => {
          // console.log(res);
          this.orderItemListData = res.docs;

          this.calculateTotalPrice();

          try { this.lastItem = res.docs.length }
          catch{ this.lastItem = 0 }

          this.isFetchingData = false;
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  createOrderItem(data: any) {
    // console.log(data);

    this.addOrderItem.isItemSaving = true;

    this.factoryApi.createBranchOrderItem(data)
      .then((res: any) => {
        // console.log(res);

        if(res.id){
          this.getOrderItemList();

          this.addOrderItem.isItemSaving = false;
          this.addOrderItem.dismissButton.nativeElement.click();
          this.addOrderItem.resetForm();
        }
      })
      .catch((err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.addOrderItem.isItemSaving = false;
      });
  }

  updateOrderItem(order_item: any) {
    this.editOrderItem.isItemSaving = true;
    
    this.factoryApi.updateBranchOrderItem(order_item.id, order_item.data)
      .then((res) => {
        // console.log(res);
        this.editOrderItem.isItemSaving = false;
        this.editOrderItem.dismissButton.nativeElement.click();
        this.getOrderItemList();
      })
      .catch((err) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.editOrderItem.isItemSaving = false;
      });
  }

  deleteOrderItem() {
    this.isItemDeleting = true;

    this.factoryApi.deleteBranchOrderItem(this.deleteId)
      .then((res) => {
        // console.log(res);
        this.isItemDeleting = false;
        this.getOrderItemList();
      })
      .catch((err) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isItemDeleting = false;
      });
  }

  patchTotalAmount(){
    const id = sessionStorage.getItem('orders_order_id') as string;
    let data = { total_price: this.totalPrice }

    this.factoryApi.updateOrder(id, data)
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        // console.log(err);
        this.connectionToast.openToast();
      });
  }

  openEditItem(data: any){
    // console.log(data);
    this.editOrderItem.openModal(data);
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
  }
  
}
