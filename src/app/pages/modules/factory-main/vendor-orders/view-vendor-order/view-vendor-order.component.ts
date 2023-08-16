import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Order } from 'src/app/models/modules/orders/orders.model';
import { FactoryApiService } from 'src/app/services/modules-api/factory-api/factory-api.service';
import { OrdersPrintService } from 'src/app/services/modules-print/orders-print/orders-print.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-view-vendor-order',
  templateUrl: './view-vendor-order.component.html',
  styleUrls: ['./view-vendor-order.component.scss']
})
export class ViewVendorOrderComponent {

  constructor(
    private router: Router,
    private factoryApi: FactoryApiService,
    private ordersPrint: OrdersPrintService,
    private formatId: FormatIdService,
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  orderData: any;
  orderTotal = 0.00;

  selectedVendorId: any;
  selectedVendorData: any;
  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));

  isFetchingData = false;
  isSavingOrder = false;
  isDeletingOrder = false;
  isSaved = false;

  orderForm = new FormGroup({
    orderCode: new FormControl({value: '', disabled: true}),
    orderDate: new FormControl(),
    vendorCode: new FormControl({value: '', disabled: true}),
    vendorName: new FormControl({value: '', disabled: true}, Validators.required),
    orderStatus: new FormControl(''),
    deliveryDate: new FormControl(),
  })

  ngOnInit(): void {
    this.getVendorOrder();
  }

  getVendorOrder() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('factory_vendor_order_id') as string;

    this.factoryApi.getVendorOrder(id)
      .then((res) => {
        console.log(res.data());
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

  updateVendorOrder() {       
    this.isSaved = true;
     
    if(this.orderForm.valid && this.selectedVendorId){
      this.isSavingOrder = true;

      const id = sessionStorage.getItem('factory_vendor_order_id') as string;
      let data = this.setUpdateVendorOrderData();

      this.factoryApi.updateVendorOrder(id, data)
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

  deleteVendorOrder() {
    this.isDeletingOrder = true;

    const id = sessionStorage.getItem('factory_vendor_order_id') as string;

    this.factoryApi.deleteVendorOrder(id)
      .then((res) => {
        // console.log(res);
        this.router.navigateByUrl('modules/factory-main/vendor-orders/all-factory-vendor-orders')
        this.isDeletingOrder = false;
      })
      .catch((err) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isDeletingOrder = false;
      });
  }

  setOrderData(){
    this.orderForm.controls.orderCode.setValue(this.formatId.formatId(this.orderData.data().order_code, 5, "#", "RD"));
    this.orderForm.controls.orderDate.setValue(this.orderData.data().order_date);
    this.orderForm.controls.vendorCode.setValue(this.formatId.formatId(this.orderData.data().vendor.data.vendor_code, 4, "#", "VE"));
    this.orderForm.controls.vendorName.setValue(this.orderData.data().vendor.data.vendor_name);
    this.orderForm.controls.orderStatus.setValue(this.orderData.data().order_status);
    this.orderForm.controls.deliveryDate.setValue(this.orderData.data().delivery_date);

    this.orderTotal = this.orderData.data().total_price;

    this.selectedVendorId = this.orderData.data().vendor.id;
    this.selectedVendorData = this.orderData.data().vendor.data;
  }

  setUpdateVendorOrderData(){
    let data: Order = {
      created_at: this.orderData.data().created_at,
      updated_at: serverTimestamp(),
      order_code: this.orderData.data().order_code,
      order_date: this.orderForm.controls.orderDate.value,
      order_status: this.orderForm.controls.orderStatus.value as string,
      delivery_date: this.orderForm.controls.deliveryDate.value,
      order_total: this.orderTotal,
      vendor: {
        id: this.selectedVendorData.id,
        data: {
          vendor_code: this.selectedVendorData.data.vendor_code,
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

    // console.log(data);
    return data;
  }

  onPrint(){
    console.log("lets print!.......");
    this.ordersPrint.printOrder();
  }

}
