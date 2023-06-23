import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Supplier } from 'src/app/models/modules/inventory/inventory.model';
import { InventoryApiService } from 'src/app/services/modules-api/inventory-api/inventory-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { SupplierFormComponent } from '../supplier-form/supplier-form.component';


@Component({
  selector: 'app-new-supplier',
  templateUrl: './new-supplier.component.html',
  styleUrls: ['./new-supplier.component.scss']
})
export class NewSupplierComponent {

  constructor(
    private router: Router,
    private inventoryApi: InventoryApiService
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('supplierFormComponentReference', { read: SupplierFormComponent, static: false }) supplierForm!: SupplierFormComponent;

  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));
  
  isSavingSupplier = false;

  createSupplier() {
    this.isSavingSupplier = true;

    let data: Supplier = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      supplier_code: this.supplierForm.supplierForm.controls.supplierCode.value as string,
      supplier_name: this.supplierForm.supplierForm.controls.supplierName.value as string,
      phone: this.supplierForm.supplierForm.controls.phone.value as string,
      email: this.supplierForm.supplierForm.controls.email.value as string,
      address: this.supplierForm.supplierForm.controls.address.value as string,
      branch: {
        id: this.selectedBranchData.id,
        data: {
          branch_name: this.selectedBranchData.data.branch_name,
          location: this.selectedBranchData.data.location,
        }
      }
    }

    console.log(data);

    this.inventoryApi.createSupplier(data)
      .then((res: any) => {
        console.log(res);

        if(res.id){
          sessionStorage.setItem('inventory_supplier_id', res.id);
          this.router.navigateByUrl("/modules/inventory/suppliers/view-supplier");
        }
        this.isSavingSupplier = false;
      })
      .catch((err: any) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isSavingSupplier = false;
      });
  }
  
}
