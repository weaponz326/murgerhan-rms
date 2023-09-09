import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { InventoryApiService } from 'src/app/services/modules-api/inventory-api/inventory-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-all-stock-items',
  templateUrl: './all-stock-items.component.html',
  styleUrls: ['./all-stock-items.component.scss']
})
export class AllStockItemsComponent {

  constructor(
    private router: Router,
    private inventoryApi: InventoryApiService,
    private aggregateTable: AggregateTableService,
    private formatId: FormatIdService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  
  stockItemListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  deleteId = "";
  isItemDeleting = false;

  tableColumns = ['item_code', 'item_name', 'total_stock', 'location', 'item_category'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 1;
  totalPages = 0;
  pageSize = 25;

  ngOnInit(): void {
    this.getStockItemList();
  }

  getStockItemList(){
    this.isFetchingData = true;

    this.inventoryApi.getStockItemList()
      .then(
        (res: any) => {
          // console.log(res);
          this.stockItemListData = res.docs;
          this.isFetchingData = false;

          this.totalPages = Math.ceil(res.docs.length / this.pageSize);
          if(res.docs.length == 0){
            this.currentPage = 0;
            this.isDataAvailable = false;
          }
          else{
            this.currentPage = 1;
            this.isDataAvailable = true;
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

  viewStockItem(itemId: any){
    // console.log(itemId);

    sessionStorage.setItem("inventory_stock_item_id", itemId);
    this.router.navigateByUrl("/modules/inventory/items/view-stock-item");
  }

  aggregateData(){
    // console.log("lets aggregate this table's data...");
    this.stockItemListData = this.aggregateTable.filterData(this.stockItemListData, this.filterText, this.tableColumns);
    this.stockItemListData = this.aggregateTable.sortData(this.stockItemListData, this.sortColumn, this.sortDirection);
    this.stockItemListData = this.aggregateTable.paginateData(this.stockItemListData, this.currentPage, this.pageSize);
  }

  getFormatId(id: any){
    return this.formatId.formatId(id, 5, "#", "SI");
  }

}
