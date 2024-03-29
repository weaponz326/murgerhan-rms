import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Vendor } from 'src/app/models/modules/orders/orders.model';
import { OrdersApiService } from 'src/app/services/modules-api/orders-api/orders-api.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

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
    private ordersApi: OrdersApiService,
    private formatId: FormatIdService,
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('vendorFormComponentReference', { read: VendorFormComponent, static: false }) vendorForm!: VendorFormComponent;

  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));
  
  isFetchingData = false;
  isSavingVendor = false;

  thisId = 0;

  ngOnInit(): void {
    this.getLastVendor();
  }

  getLastVendor(){
    this.isFetchingData = true;

    this.ordersApi.getLastVendor()
      .then(
        (res: any) => {
          // console.log(res);
          if(res.docs[0])
            this.thisId = res.docs[0]?.data()?.vendor_code + 1;        
          else  
            this.thisId = this.thisId + 1;
          this.vendorForm.vendorForm.controls.vendorCode.setValue(this.formatId.formatId(this.thisId, 4, "#", "VE"));
          this.isFetchingData = false;
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  createVendor() {
    this.vendorForm.isSaved = true;
    
    if(this.vendorForm.vendorForm.valid){
      this.isSavingVendor = true;

      let data = this.setCreateVendorData();

      this.ordersApi.createVendor(data)
        .then((res: any) => {
          // console.log(res);

          if(res.id){
            sessionStorage.setItem('orders_vendor_id', res.id);
            this.router.navigateByUrl("/modules/orders/vendors/view-vendor");
          }
          this.isSavingVendor = false;
        })
        .catch((err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isSavingVendor = false;
        });
    }
  }

  setCreateVendorData(){
    let data: Vendor = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      vendor_code: this.thisId,
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

    // console.log(data);
    return data;
  }
  
}
