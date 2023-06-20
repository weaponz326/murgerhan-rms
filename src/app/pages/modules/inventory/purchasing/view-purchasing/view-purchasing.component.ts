import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Purchasing } from 'src/app/models/modules/inventory/inventory.model';
import { InventoryApiService } from 'src/app/services/modules-api/inventory-api/inventory-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalOneComponent } from 'src/app/components/module-utilities/delete-modal-one/delete-modal-one.component';


@Component({
  selector: 'app-view-purchasing',
  templateUrl: './view-purchasing.component.html',
  styleUrls: ['./view-purchasing.component.scss']
})
export class ViewPurchasingComponent {

  constructor(
    private router: Router,
    private inventoryApi: InventoryApiService
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalOneComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  purchasingData: any;

  selectedSupplierData: any;
  selectedBranchData: any;

  isFetchingData = false;
  isSavingPurchasing = false;
  isDeletingPurchasing = false;

  purchasingForm = new FormGroup({
    purchasingCode: new FormControl(''),
    purchasingDate: new FormControl(),
    supplierCode: new FormControl(''),
    supplierName: new FormControl(''),
    inventorytatus: new FormControl(''),
    deliveryDate: new FormControl(),
  })

  ngOnInit(): void {
    this.getPurchasing();
  }

  getPurchasing() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('inventory_purchasing_id') as string;

    this.inventoryApi.getPurchasing(id)
      .then((res) => {
        console.log(res);
        this.purchasingData = res;
        this.isFetchingData = false;
        this.setPurchasingData();        
      }),
      (err: any) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  updatePurchasing() {
    this.isSavingPurchasing = true;
    
    const id = sessionStorage.getItem('inventory_purchasing_id') as string;

    let data: Purchasing = {
      created_at: this.purchasingData.data().created_at,
      updated_at: serverTimestamp(),
      purchasing_code: this.purchasingForm.controls.purchasingCode.value as string,
      purchasing_date: this.purchasingForm.controls.purchasingDate.value,
      purchasing_status: this.purchasingForm.controls.inventorytatus.value as string,
      delivery_date: this.purchasingForm.controls.deliveryDate.value,
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

    this.inventoryApi.updatePurchasing(id, data)
      .then((res) => {
        console.log(res);
        this.isSavingPurchasing = false;
      })
      .catch((err) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isSavingPurchasing = false;
      });
  }

  deletePurchasing() {
    this.isDeletingPurchasing = true;

    const id = sessionStorage.getItem('inventory_purchasing_id') as string;

    this.inventoryApi.deletePurchasing(id)
      .then((res) => {
        console.log(res);
        this.router.navigateByUrl('modules/inventory/purchasinge/all-purchasinges')
        this.isDeletingPurchasing = false;
      })
      .catch((err) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isDeletingPurchasing = false;
      });
  }

  setPurchasingData(){
    this.purchasingForm.controls.purchasingCode.setValue(this.purchasingData.data().purchasing_code);
    this.purchasingForm.controls.purchasingDate.setValue(this.purchasingData.data().purchasing_date);
    this.purchasingForm.controls.supplierCode.setValue(this.purchasingData.data().supplier_code);
    this.purchasingForm.controls.supplierName.setValue(this.purchasingData.data().supplier_name);
    this.purchasingForm.controls.inventorytatus.setValue(this.purchasingData.data().purchasing_status);
    this.purchasingForm.controls.deliveryDate.setValue(this.purchasingData.data().delivery_date);
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

}
