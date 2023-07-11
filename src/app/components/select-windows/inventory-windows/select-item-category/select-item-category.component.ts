import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { InventoryApiService } from 'src/app/services/modules-api/inventory-api/inventory-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-select-item-category',
  templateUrl: './select-item-category.component.html',
  styleUrls: ['./select-item-category.component.scss']
})
export class SelectItemCategoryComponent {

  constructor(
    private inventoryApi: InventoryApiService,
    private aggregateTable: AggregateTableService,
    private formatId: FormatIdService
  ) { }

  @Output() rowSelected = new EventEmitter<object>();
  @Input() closeTarget = "";

  @ViewChild('openButtonElementReference', { read: ElementRef, static: false }) openButton!: ElementRef;
  @ViewChild('closeButtonElementReference', { read: ElementRef, static: false }) closeButton!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  itemcategoryListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  tableColumns = ['category_code', 'category_name'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 0;
  totalPages = 0;
  pageSize = 15;

  openModal(){
    this.itemcategoryListData = [];
    this.getItemCategoryList();
    this.openButton.nativeElement.click();
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
          if(res.docs.length == 0)
            this.isDataAvailable = false;
          else
            this.currentPage = 1

          this.aggregateData();
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  selectRow(row: any){
    this.rowSelected.emit(row);
    this.closeButton.nativeElement.click();
    // console.log(row);
  }

  aggregateData(){
    // console.log("lets aggregate this table's data...");
    this.itemcategoryListData = this.aggregateTable.filterData(this.itemcategoryListData, this.filterText, this.tableColumns);
    this.itemcategoryListData = this.aggregateTable.sortData(this.itemcategoryListData, this.sortColumn, this.sortDirection);
    this.itemcategoryListData = this.aggregateTable.paginateData(this.itemcategoryListData, this.currentPage, this.pageSize);
  }

  getFormatId(id: any){
    return this.formatId.formatId(id, 4, "3", "CT");
  }
  
}
