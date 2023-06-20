import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Supplier } from 'src/app/models/modules/inventory/inventory.model';
import { InventoryApiService } from 'src/app/services/modules-api/inventory-api/inventory-api.service';

import { SupplierFormComponent } from '../supplier-form/supplier-form.component';
import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalOneComponent } from 'src/app/components/module-utilities/delete-modal-one/delete-modal-one.component';


@Component({
  selector: 'app-view-supplier',
  templateUrl: './view-supplier.component.html',
  styleUrls: ['./view-supplier.component.scss']
})
export class ViewSupplierComponent {

  constructor(
    private router: Router,
    private inventoryApi: InventoryApiService
  ) {}

  @ViewChild('supplierFormComponentReference', { read: SupplierFormComponent, static: false }) supplierForm!: SupplierFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalOneComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  supplierData: any;
  selectedBranchData: any;

  isFetchingData = false;
  isSavingSupplier = false;
  isDeletingSupplier = false;

  ngOnInit(): void {
    this.getSupplier();
  }

  getSupplier() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('inventory_supplier_id') as string;

    this.inventoryApi.getSupplier(id)
      .then((res) => {
        console.log(res);
        this.supplierData = res;
        this.isFetchingData = false;
        this.setSupplierData();        
      }),
      (err: any) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  updateSupplier() {
    this.isSavingSupplier = true;
    
    const id = sessionStorage.getItem('inventory_supplier_id') as string;

    let data: Supplier = {
      created_at: this.supplierData.data().created_at,
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

    this.inventoryApi.updateSupplier(id, data)
      .then((res) => {
        console.log(res);
        this.isSavingSupplier = false;
      })
      .catch((err) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isSavingSupplier = false;
      });
  }

  deleteSupplier() {
    this.isDeletingSupplier = true;

    const id = sessionStorage.getItem('inventory_supplier_id') as string;

    this.inventoryApi.deleteSupplier(id)
      .then((res) => {
        console.log(res);
        this.router.navigateByUrl('modules/inventory/supplieres/all-supplieres')
        this.isDeletingSupplier = false;
      })
      .catch((err) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isDeletingSupplier = false;
      });
  }

  setSupplierData(){
    this.supplierForm.supplierForm.controls.supplierCode.setValue(this.supplierData.data().supplier_code);
    this.supplierForm.supplierForm.controls.supplierName.setValue(this.supplierData.data().supplier_name);
    this.supplierForm.supplierForm.controls.phone.setValue(this.supplierData.data().phone);
    this.supplierForm.supplierForm.controls.email.setValue(this.supplierData.data().email);
    this.supplierForm.supplierForm.controls.address.setValue(this.supplierData.data().address);
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

}
