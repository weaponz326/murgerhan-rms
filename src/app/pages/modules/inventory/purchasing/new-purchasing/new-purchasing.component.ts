import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Purchasing } from 'src/app/models/modules/inventory/inventory.model';
import { InventoryApiService } from 'src/app/services/modules-api/inventory-api/inventory-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


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
  
  selectedBranchData: any;
  selectedSupplierData: any;
  
  isSavingPurchasing = false;

  purchasingForm = new FormGroup({
    purchasingCode: new FormControl(''),
    purchasingDate: new FormControl(),
    supplierCode: new FormControl(''),
    supplierName: new FormControl(''),
  })

  openModal(){
    this.newButton.nativeElement.click();
  }

  createPurchasing() {
    this.isSavingPurchasing = true;

    let data: Purchasing = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      purchasing_code: this.purchasingForm.controls.purchasingCode.value as string,
      purchasing_date: this.purchasingForm.controls.purchasingDate.value,
      purchasing_status: "Processing",
      delivery_date: null,
      total_price: 0.00,
      supplier: {
        id: this.selectedSupplierData.id,
        data: {
          supplier_code: this.selectedSupplierData.data.supplier_id,
          supplier_name: this.selectedSupplierData.data.supplier_name
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

    this.inventoryApi.createPurchasing(data)
      .then((res: any) => {
        console.log(res);

        if(res.id){
          sessionStorage.setItem('inventory_purchasing_id', res.id);
          this.router.navigateByUrl("/modules/inventory/purchasing/view-purchasing");
        }
        this.isSavingPurchasing = false;
      })
      .catch((err: any) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isSavingPurchasing = false;
      });
  }
  
}
