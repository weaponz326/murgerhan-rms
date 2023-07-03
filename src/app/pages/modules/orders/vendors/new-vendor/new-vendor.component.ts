import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Vendor } from 'src/app/models/modules/orders/orders.model';
import { OrdersApiService } from 'src/app/services/modules-api/orders-api/orders-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { VendorFormComponent } from '../vendor-form/vendor-form.component';


@Component({
  selector: 'app-new-vendor',
  templateUrl: './new-vendor.component.html',
  styleUrls: ['./new-vendor.component.scss']
})
export class NewVendorComponent {

  constructor(
    private router: Router,
    private ordersApi: OrdersApiService
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('vendorFormComponentReference', { read: VendorFormComponent, static: false }) vendorForm!: VendorFormComponent;

  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));
  
  isSavingVendor = false;

  createVendor() {
    this.vendorForm.isSaved = true;
    
    let data: Vendor = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      vendor_code: this.vendorForm.vendorForm.controls.vendorCode.value as string,
      vendor_name: this.vendorForm.vendorForm.controls.vendorName.value as string,
      phone: this.vendorForm.vendorForm.controls.phone.value as string,
      email: this.vendorForm.vendorForm.controls.email.value as string,
      address: this.vendorForm.vendorForm.controls.address.value as string,
      branch: {
        id: this.selectedBranchData.id,
        data: {
          branch_name: this.selectedBranchData.data.branch_name,
          location: this.selectedBranchData.data.location,
        }
      }
    }

    if(this.vendorForm.vendorForm.valid){
      this.isSavingVendor = true;

      this.ordersApi.createVendor(data)
        .then((res: any) => {
          console.log(res);

          if(res.id){
            sessionStorage.setItem('orders_vendor_id', res.id);
            this.router.navigateByUrl("/modules/orders/vendors/view-vendor");
          }
          this.isSavingVendor = false;
        })
        .catch((err: any) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isSavingVendor = false;
        });
    }
  }
  
}
