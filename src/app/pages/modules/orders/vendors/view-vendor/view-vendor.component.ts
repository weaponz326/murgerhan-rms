import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Vendor } from 'src/app/models/modules/orders/orders.model';
import { OrdersApiService } from 'src/app/services/modules-api/orders-api/orders-api.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { VendorFormComponent } from '../vendor-form/vendor-form.component';
import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalOneComponent } from 'src/app/components/module-utilities/delete-modal-one/delete-modal-one.component';


@Component({
  selector: 'app-view-vendor',
  templateUrl: './view-vendor.component.html',
  styleUrls: ['./view-vendor.component.scss']
})
export class ViewVendorComponent {

  constructor(
    private router: Router,
    private ordersApi: OrdersApiService,
    private formatId: FormatIdService,
  ) {}

  @ViewChild('vendorFormComponentReference', { read: VendorFormComponent, static: false }) vendorForm!: VendorFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalOneComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  vendorData: any;
  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));

  isFetchingData = false;
  isSavingVendor = false;
  isDeletingVendor = false;

  ngOnInit(): void {
    this.getVendor();
  }

  getVendor() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('orders_vendor_id') as string;

    this.ordersApi.getVendor(id)
      .then((res) => {
        // console.log(res);
        this.vendorData = res;
        this.isFetchingData = false;
        this.setVendorData();        
      }),
      (err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  updateVendor() {    
    this.vendorForm.isSaved = true;
    
    if(this.vendorForm.vendorForm.valid){
      this.isSavingVendor = true;
  
      const id = sessionStorage.getItem('orders_vendor_id') as string;
      let data = this.setUpdateVendorData();

      this.ordersApi.updateVendor(id, data)
        .then((res) => {
          // console.log(res);
          this.isSavingVendor = false;
        })
        .catch((err) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isSavingVendor = false;
        });
    }
  }

  deleteVendor() {
    this.isDeletingVendor = true;

    const id = sessionStorage.getItem('orders_vendor_id') as string;

    this.ordersApi.deleteVendor(id)
      .then((res) => {
        // console.log(res);
        this.router.navigateByUrl('modules/orders/vendores/all-vendors')
        this.isDeletingVendor = false;
      })
      .catch((err) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isDeletingVendor = false;
      });
  }

  setVendorData(){
    this.vendorForm.vendorForm.controls.vendorCode.setValue(this.formatId.formatId(this.vendorData.data().vendor_code, 4, "#", "VE"));
    this.vendorForm.vendorForm.controls.vendorName.setValue(this.vendorData.data().vendor_name);
    this.vendorForm.vendorForm.controls.phone.setValue(this.vendorData.data().phone);
    this.vendorForm.vendorForm.controls.email.setValue(this.vendorData.data().email);
    this.vendorForm.vendorForm.controls.address.setValue(this.vendorData.data().address);
  }

  setUpdateVendorData(){
    let data: Vendor = {
      created_at: this.vendorData.data().created_at,
      updated_at: serverTimestamp(),
      vendor_code: this.vendorData.data().vendor_code,
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

  confirmDelete(){
    this.deleteModal.openModal();
  }
  
}
