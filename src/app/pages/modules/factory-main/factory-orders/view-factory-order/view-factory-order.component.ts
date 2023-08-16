import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { FactoryOrder } from 'src/app/models/modules/factory/factory.model';
import { FactoryApiService } from 'src/app/services/modules-api/factory-api/factory-api.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalOneComponent } from 'src/app/components/module-utilities/delete-modal-one/delete-modal-one.component';


@Component({
  selector: 'app-view-factory-order',
  templateUrl: './view-factory-order.component.html',
  styleUrls: ['./view-factory-order.component.scss']
})
export class ViewFactoryOrderComponent {

  constructor(
    private router: Router,
    private factoryApi: FactoryApiService,
    private formatId: FormatIdService,
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalOneComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  orderData: any;
  orderItemListData: any[] = [];

  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));

  totalPrice: number = 0.00;

  isFetchingData = false;
  isDataAvailable: boolean =  true;
  isSavingOrder = false;
  isDeletingOrder = false;
  isSaved = false;
  
  orderForm = new FormGroup({
    orderCode: new FormControl({value: '', disabled: true}),
    orderDate: new FormControl({ value: null, disabled: true }),
    orderStatus: new FormControl(''),
  })

  ngOnInit(): void {
    this.getOrder();
    this.getOrderItemList();
  }

  calculateTotalPrice(){
    this.totalPrice = 0;
    for (let item of this.orderItemListData){
      this.totalPrice += item.data().factory_item.data.price * item.data().quantity;
    }

    // console.log(this.totalPrice);
  }

  getOrder() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('factory_order_id') as string;

    this.factoryApi.getOrder(id)
      .then((res) => {
        // console.log(res);
        this.orderData = res;
        this.isFetchingData = false;
        this.setOrderData();        
      }),
      (err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  updateOrder() {       
    this.isSaved = true;
     
    if(this.orderForm.valid){
      this.isSavingOrder = true;

      const id = sessionStorage.getItem('factory_order_id') as string;
      let data = this.setUpdateOrderData();

      this.factoryApi.updateOrder(id, data)
        .then((res) => {
          // console.log(res);
          this.isSavingOrder = false;
        })
        .catch((err) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isSavingOrder = false;
        });
    }
  }

  deleteOrder() {
    this.isDeletingOrder = true;

    const id = sessionStorage.getItem('factory_order_id') as string;

    this.factoryApi.deleteOrder(id)
      .then((res) => {
        // console.log(res);
        this.router.navigateByUrl('modules/branch-factory/branch-orders/all-branch-orders')
        this.isDeletingOrder = false;
      })
      .catch((err) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isDeletingOrder = false;
      });
  }

  getOrderItemList(){
    this.isFetchingData = true;

    this.factoryApi.getBranchOrderItemList()
      .then(
        (res: any) => {
          // console.log(res);
          this.orderItemListData = res.docs;
          this.calculateTotalPrice();
          this.isFetchingData = false;
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  setOrderData(){
    this.orderForm.controls.orderCode.setValue(this.formatId.formatId(this.orderData.data().order_code, 5, "#", "RD"));
    this.orderForm.controls.orderDate.setValue(this.orderData.data().order_date);
    this.orderForm.controls.orderStatus.setValue(this.orderData.data().order_status);
  }

  setUpdateOrderData(){
    let data: FactoryOrder = {
      created_at: this.orderData.data().created_at,
      updated_at: serverTimestamp(),
      order_code: this.orderData.data().order_code,
      order_date: this.orderForm.controls.orderDate.value,
      order_status: this.orderForm.controls.orderStatus.value as string,
      total_price: 0.00,
      branch: {
        id: this.selectedBranchData.id,
        data: {
          branch_name: this.selectedBranchData.data.branch_name,
          location: this.selectedBranchData.data.location
        }
      },
    }

    // console.log(data);
    return data;
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

}
