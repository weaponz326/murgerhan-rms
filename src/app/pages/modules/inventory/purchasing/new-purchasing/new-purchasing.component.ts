import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Purchasing } from 'src/app/models/modules/inventory/inventory.model';
import { InventoryApiService } from 'src/app/services/modules-api/inventory-api/inventory-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { SelectSupplierComponent } from 'src/app/components/select-windows/inventory-windows/select-supplier/select-supplier.component';


@Component({
  selector: 'app-new-purchasing',
  templateUrl: './new-purchasing.component.html',
  styleUrls: ['./new-purchasing.component.scss']
})
export class NewPurchasingComponent {

  constructor(
    private router: Router,
    private inventoryApi: InventoryApiService
  ) {}  
  
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('newButtonElementReference', { read: ElementRef, static: false }) newButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('selectSupplierComponentReference', { read: SelectSupplierComponent, static: false }) selectSupplier!: SelectSupplierComponent;
  
  selectedSupplierId: any;
  selectedSupplierData: any;
  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));
  selectedUserData: any = JSON.parse(String(localStorage.getItem("selected_user_role")));
  
  isSavingPurchasing = false;
  isSaved = false;

  purchasingForm = new FormGroup({
    purchasingCode: new FormControl(''),
    purchasingDate: new FormControl(),
    supplierCode: new FormControl({value: '', disabled: true}),
    supplierName: new FormControl({value: '', disabled: true}, Validators.required),
  })

  openModal(){
    this.purchasingForm.controls.purchasingDate.setValue(new Date().toISOString().slice(0, 16));
    this.newButton.nativeElement.click();
  }

  createPurchasing() {
    this.isSaved = true;

    let data: Purchasing = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      purchasing_code: this.purchasingForm.controls.purchasingCode.value as string,
      purchasing_date: this.purchasingForm.controls.purchasingDate.value,
      purchasing_status: "Processing",
      date_received: null,
      comments: "",
      total_price: 0.00,
      received_by: {
        id: localStorage.getItem('uid') as string,
        data: {
          staff_code: this.selectedUserData.staff_code as string,
          full_name: this.selectedUserData.full_name as string,
          staff_role: this.selectedUserData.staff_role as string,
        }
      },
      supplier: {
        id: this.selectedSupplierId,
        data: {
          supplier_code: this.selectedSupplierData.supplier_code,
          supplier_name: this.selectedSupplierData.supplier_name
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

    if(this.purchasingForm.valid){
      this.isSavingPurchasing = true;

      this.inventoryApi.createPurchasing(data)
        .then((res: any) => {
          // console.log(res);

          if(res.id){
            sessionStorage.setItem('inventory_purchasing_id', res.id);
            this.router.navigateByUrl("/modules/inventory/purchasing/view-purchasing");
          }

          this.dismissButton.nativeElement.click();
          this.isSavingPurchasing = false;
        })
        .catch((err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isSavingPurchasing = false;
        });
      }
  }
  
  openSupplierWindow(){
    // console.log("You are opening select supplier window")
    this.selectSupplier.openModal();
  }

  onSupplierSelected(supplierData: any){
    // console.log(supplierData);
    this.selectedSupplierId = supplierData.id;
    this.selectedSupplierData = supplierData.data();
    this.purchasingForm.controls.supplierCode.setValue(supplierData.data().supplier_code);
    this.purchasingForm.controls.supplierName.setValue(supplierData.data().supplier_name);
  }

}
