import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { InventoryApiService } from 'src/app/services/modules-api/inventory-api/inventory-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-all-item-categories',
  templateUrl: './all-item-categories.component.html',
  styleUrls: ['./all-item-categories.component.scss']
})
export class AllItemCategoriesComponent {

  constructor(
    private router: Router,
    private inventoryApi: InventoryApiService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  itemcategoryListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPageSize = 0;
  currentPageNumber = 0;
  defaultPageSize = 25;
  sorting = {
    created_at: "desc",
    log_code: "",
    user: "",
    activity: ""
  };
  querying = {
    created_at: "",
    log_code: "",
    user: "",
    activity: ""
  }

  ngOnInit(): void {
    this.getItemCategoryList();
  }

  getItemCategoryList(){
    this.isFetchingData = true;

    this.inventoryApi.getItemCategoryList(this.defaultPageSize, this.currentPageNumber, this.sorting, this.querying)
      .then(
        (res: any) => {
          console.log(res);
          this.itemcategoryListData = res.docs;
          this.isFetchingData = false;
        },
        (err: any) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  viewItemCategory(itemCategoryId: any){
    console.log(itemCategoryId);

    sessionStorage.setItem("inventory_category_id", itemCategoryId);
    this.router.navigateByUrl("/modules/inventory/category/edit-category");
  }

  changePage(page: any){
    this.currentPageNumber = page;
    this.getItemCategoryList();
  }

}
