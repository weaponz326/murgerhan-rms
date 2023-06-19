import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Order } from 'src/app/models/modules/orders/orders.model';
import { OrdersApiService } from 'src/app/services/modules-api/orders-api/orders-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalOneComponent } from 'src/app/components/module-utilities/delete-modal-one/delete-modal-one.component';


@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent {

  constructor(
    private router: Router,
    private ordersApi: OrdersApiService
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalOneComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  orderData: any;

  selectedVendorData: any;
  selectedBranchData: any;

  isFetchingData = false;
  isSavingOrder = false;
  isDeletingOrder = false;

  orderForm = new FormGroup({
    orderCode: new FormControl(''),
    orderDate: new FormControl(),
    vendorCode: new FormControl(''),
    vendorName: new FormControl(''),
    orderStatus: new FormControl(''),
    deliveryDate: new FormControl(),
  })

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('orders_order_id') as string;

    this.ordersApi.getOrder(id)
      .then((res) => {
        console.log(res);
        this.orderData = res;
        this.isFetchingData = false;
        this.setOrderData();        
      }),
      (err: any) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  updateOrder() {
    this.isSavingOrder = true;
    
    const id = sessionStorage.getItem('orders_order_id') as string;

    let data: Order = {
      created_at: this.orderData.data().created_at,
      updated_at: serverTimestamp(),
      order_code: this.orderForm.controls.orderCode.value as string,
      order_date: this.orderForm.controls.orderDate.value,
      order_status: this.orderForm.controls.orderStatus.value as string,
      delivery_date: this.orderForm.controls.deliveryDate.value,
      total_price: 0.00,
      vendor: {
        id: this.selectedVendorData.id,
        data: {
          vendor_id: this.selectedVendorData.data.vendor_id,
          vendor_name: this.selectedVendorData.data.vendor_name
        }
      },
      branch: {
        id: this.selectedBranchData.id,
        data: {
          branch_name: this.selectedBranchData.data.branch_name,
          location: this.selectedBranchData.data.location
        }
      },
    }

    this.ordersApi.updateOrder(id, data)
      .then((res) => {
        console.log(res);
        this.isSavingOrder = false;
      })
      .catch((err) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isSavingOrder = false;
      });
  }

  deleteOrder() {
    this.isDeletingOrder = true;

    const id = sessionStorage.getItem('orders_order_id') as string;

    this.ordersApi.deleteOrder(id)
      .then((res) => {
        console.log(res);
        this.router.navigateByUrl('modules/orders/orderes/all-orderes')
        this.isDeletingOrder = false;
      })
      .catch((err) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isDeletingOrder = false;
      });
  }

  setOrderData(){
    this.orderForm.controls.orderCode.setValue(this.orderData.data().order_code);
    this.orderForm.controls.orderDate.setValue(this.orderData.data().order_date);
    this.orderForm.controls.vendorCode.setValue(this.orderData.data().vendor_code);
    this.orderForm.controls.vendorName.setValue(this.orderData.data().vendor_name);
    this.orderForm.controls.orderStatus.setValue(this.orderData.data().order_status);
    this.orderForm.controls.deliveryDate.setValue(this.orderData.data().delivery_date);
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }
  
}
