import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { InventoryApiService } from 'src/app/services/modules-api/inventory-api/inventory-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

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
    private aggregateTable: AggregateTableService,
    private formatId: FormatIdService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  itemcategoryListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  tableColumns = ['category_code', 'category_name'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 1;
  totalPages = 0;
  pageSize = 25;

  ngOnInit(): void {
    this.getItemCategoryList();
  }

  getItemCategoryList(){
    this.isFetchingData = true;

    this.inventoryApi.getItemCategoryList()
      .then(
        (res: any) => {
          // console.log(res);
          this.itemcategoryListData = res.docs;
          this.isFetchingData = false;

          this.totalPages = Math.ceil(res.docs.length / this.pageSize);
          if(res.docs.length == 0){
            this.currentPage = 0;
            this.isDataAvailable = false;
          }

          this.aggregateData();
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  viewItemCategory(itemCategoryId: any){
    // console.log(itemCategoryId);

    sessionStorage.setItem("inventory_category_id", itemCategoryId);
    this.router.navigateByUrl("/modules/inventory/categories/edit-item-category");
  }

  aggregateData(){
    // console.log("lets aggregate this table's data...");
    this.itemcategoryListData = this.aggregateTable.filterData(this.itemcategoryListData, this.filterText, this.tableColumns);
    this.itemcategoryListData = this.aggregateTable.sortData(this.itemcategoryListData, this.sortColumn, this.sortDirection);
    this.itemcategoryListData = this.aggregateTable.paginateData(this.itemcategoryListData, this.currentPage, this.pageSize);
  }

  getFormatId(id: any){
    return this.formatId.formatId(id, 3, "#", "CT");
  }

}
