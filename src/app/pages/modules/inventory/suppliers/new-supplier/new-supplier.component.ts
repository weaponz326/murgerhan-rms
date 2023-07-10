import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Supplier } from 'src/app/models/modules/inventory/inventory.model';
import { InventoryApiService } from 'src/app/services/modules-api/inventory-api/inventory-api.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

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
    private inventoryApi: InventoryApiService,
    private formatId: FormatIdService
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('supplierFormComponentReference', { read: SupplierFormComponent, static: false }) supplierForm!: SupplierFormComponent;

  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));
  
  isFetchingData = false;
  isSavingSupplier = false;

  thisId = 0;

  ngOnInit(): void {
    this.getLastSupplier();
  }

  getLastSupplier(){
    this.isFetchingData = true;

    this.inventoryApi.getLastSupplier()
      .then(
        (res: any) => {
          // console.log(res);
          if(res.docs[0])
            this.thisId = res.docs[0]?.data()?.supplier_code + 1;        
          else  
            this.thisId = this.thisId + 1;
          this.supplierForm.supplierForm.controls.supplierCode.setValue(this.formatId.formatId(this.thisId, 4, "#", "SU"));
          this.isFetchingData = false;
        },
        (err: any) => {
          // console.log(err);
          // this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  createSupplier() {
    this.supplierForm.isSaved = true;
    
    let data: Supplier = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      supplier_code: this.thisId,
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

    // console.log(data);

    if(this.supplierForm.supplierForm.valid){
      this.isSavingSupplier = true;

      this.inventoryApi.createSupplier(data)
        .then((res: any) => {
          // console.log(res);

          if(res.id){
            sessionStorage.setItem('inventory_supplier_id', res.id);
            this.router.navigateByUrl("/modules/inventory/suppliers/view-supplier");
          }
          this.isSavingSupplier = false;
        })
        .catch((err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isSavingSupplier = false;
        });
      }
  }
  
}
