import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { ItemCategory } from 'src/app/models/modules/inventory/inventory.model';
import { InventoryApiService } from 'src/app/services/modules-api/inventory-api/inventory-api.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ItemCategoryFormComponent } from '../item-category-form/item-category-form.component';
import { DeleteModalOneComponent } from 'src/app/components/module-utilities/delete-modal-one/delete-modal-one.component';
import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-edit-item-category',
  templateUrl: './edit-item-category.component.html',
  styleUrls: ['./edit-item-category.component.scss']
})
export class EditItemCategoryComponent {

  constructor(
    private router: Router,
    private inventoryApi: InventoryApiService,
    private formatId: FormatIdService,
  ) {}

  @ViewChild('itemCategoryFormComponentReference', { read: ItemCategoryFormComponent, static: false }) categoryForm!: ItemCategoryFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalOneComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  itemcategoryData: any;

  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));
  
  isFetchingData = false;
  isSavingCategory = false;
  isDeletingCategory = false;

  ngOnInit(): void {
    this.getItemCategory();
  }

  getItemCategory() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('inventory_category_id') as string;

    this.inventoryApi.getItemCategory(id)
      .then((res) => {
        // console.log(res);
        this.itemcategoryData = res;
        this.isFetchingData = false;
        this.setItemCategoryData();        
      }),
      (err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  updateItemCategory() {    
    this.categoryForm.isSaved = true;
    
    const id = sessionStorage.getItem('inventory_category_id') as string;

    let data: ItemCategory = {
      created_at: this.itemcategoryData.data().created_at,
      updated_at: serverTimestamp(),
      category_code: this.itemcategoryData.data().category_code,
      category_name: this.categoryForm.categoryForm.controls.categoryName.value as string,
      description: this.categoryForm.categoryForm.controls.description.value as string,
      branch: {
        id: this.selectedBranchData.id,
        data: {
          branch_name: this.selectedBranchData.data.branch_name,
          location: this.selectedBranchData.data.location
        }
      }
    }

    if(this.categoryForm.categoryForm.valid){
      this.isSavingCategory = true;

      this.inventoryApi.updateItemCategory(id, data)
        .then((res) => {
          // console.log(res);
          this.isSavingCategory = false;
        })
        .catch((err) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isSavingCategory = false;
        });
    }
  }
  
  deleteItemCategory() {
    this.isDeletingCategory = true;

    const id = sessionStorage.getItem('inventory_category_id') as string;

    this.inventoryApi.deleteItemCategory(id)
      .then((res) => {
        // console.log(res);
        this.router.navigateByUrl('modules/inventory/categories/all-item-categories')
        this.isDeletingCategory = false;
      })
      .catch((err) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isDeletingCategory = false;
      });
  }

  setItemCategoryData(){
    this.categoryForm.categoryForm.controls.categoryCode.setValue(this.formatId.formatId(this.itemcategoryData.data().category_code, 3, "#", "CT"));
    this.categoryForm.categoryForm.controls.categoryName.setValue(this.itemcategoryData.data().category_name);
    this.categoryForm.categoryForm.controls.description.setValue(this.itemcategoryData.data().description);
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }
  
}
