import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { ItemCategory } from 'src/app/models/modules/inventory/inventory.model';
import { InventoryApiService } from 'src/app/services/modules-api/inventory-api/inventory-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { ItemCategoryFormComponent } from '../item-category-form/item-category-form.component';


@Component({
  selector: 'app-add-item-category',
  templateUrl: './add-item-category.component.html',
  styleUrls: ['./add-item-category.component.scss']
})
export class AddItemCategoryComponent {

  constructor(
    private router: Router,
    private inventoryApi: InventoryApiService
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('itemCategoryFormComponentReference', { read: ItemCategoryFormComponent, static: false }) categoryForm!: ItemCategoryFormComponent;

  selectedBranchData: any;
  
  isSavingCategory = false;

  createItemCategory() {
    this.isSavingCategory = true;

    let data: ItemCategory = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      category_code: this.categoryForm.categoryForm.controls.categoryCode.value as string,
      category_name: this.categoryForm.categoryForm.controls.categoryName.value as string,
      description: this.categoryForm.categoryForm.controls.description.value as string,
      branch: {
        id: this.selectedBranchData.id,
        data: {
          branch_name: this.selectedBranchData.data.branch_name,
          location: this.selectedBranchData.data.location,
        }
      }
    }

    console.log(data);

    this.inventoryApi.createItemCategory(data)
      .then((res: any) => {
        console.log(res);

        if(res.id){
          sessionStorage.setItem('inventory_itemcategory_id', res.id);
          this.router.navigateByUrl("/modules/inventory/category/edit-category");
        }
        this.isSavingCategory = false;
      })
      .catch((err: any) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isSavingCategory = false;
      });
  }
  
}
