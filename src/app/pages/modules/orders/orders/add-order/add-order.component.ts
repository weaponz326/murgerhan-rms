import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Order } from 'src/app/models/modules/orders/orders.model';
import { OrdersApiService } from 'src/app/services/modules-api/orders-api/orders-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent {  

  constructor(
    private router: Router,
    private ordersApi: OrdersApiService
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('newButtonElementReference', { read: ElementRef, static: false }) newButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;  

  isSavingOrder = false;

  selectedVendorData: any;
  selectedBranchData: any;

  orderForm = new FormGroup({
    orderCode: new FormControl(''),
    orderDate: new FormControl(),
    vendorCode: new FormControl(''),
    vendorName: new FormControl(''),
  })

  openModal(){
    this.orderForm.controls.orderDate.setValue(new Date().toISOString().slice(0, 16));
    this.newButton.nativeElement.click();
  }
  
  createOrder() {
    this.isSavingOrder = true;

    let data: Order = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      order_code: this.orderForm.controls.orderCode.value as string,
      order_date: this.orderForm.controls.orderDate.value,
      order_status: "Processing",
      delivery_date: null,
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

    console.log(data);

    this.ordersApi.createOrder(data)
      .then((res: any) => {
        console.log(res);

        if(res.id){
          sessionStorage.setItem('orders_order_id', res.id);
          this.router.navigateByUrl("/modules/orders/orders/view-order");
        }
        this.isSavingOrder = false;
      })
      .catch((err: any) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isSavingOrder = false;
      });
  }

}
