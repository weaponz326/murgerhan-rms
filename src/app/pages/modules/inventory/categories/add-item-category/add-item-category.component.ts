import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { ItemCategory } from 'src/app/models/modules/inventory/inventory.model';
import { InventoryApiService } from 'src/app/services/modules-api/inventory-api/inventory-api.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

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
    private inventoryApi: InventoryApiService,
    private formatId: FormatIdService,
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('itemCategoryFormComponentReference', { read: ItemCategoryFormComponent, static: false }) categoryForm!: ItemCategoryFormComponent;

  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));
  
  isFetchingData = false;
  isSavingCategory = false;

  thisId = 0;

  ngOnInit(): void {
    this.getLastItemCategory();
  }

  getLastItemCategory(){
    this.isFetchingData = true;

    this.inventoryApi.getLastItemCategory()
      .then(
        (res: any) => {
          // console.log(res);
          if(res.docs[0])
            this.thisId = res.docs[0]?.data()?.category_code + 1;        
          else  
            this.thisId = this.thisId + 1;
          this.categoryForm.categoryForm.controls.categoryCode.setValue(this.formatId.formatId(this.thisId, 3, "#", "CT"));
          this.isFetchingData = false;
        },
        (err: any) => {
          // console.log(err);
          // this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  createItemCategory() {
    this.categoryForm.isSaved = true;
    
    let data: ItemCategory = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      category_code: this.thisId,
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

    // console.log(data);

    if(this.categoryForm.categoryForm.valid){
      this.isSavingCategory = true;

      this.inventoryApi.createItemCategory(data)
        .then((res: any) => {
          // console.log(res);

          if(res.id){
            sessionStorage.setItem('inventory_category_id', res.id);
            this.router.navigateByUrl("/modules/inventory/categories/edit-item-category");
          }
          this.isSavingCategory = false;
        })
        .catch((err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isSavingCategory = false;
        });
    } 
  }
  
}
