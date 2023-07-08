import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { InventoryApiService } from 'src/app/services/modules-api/inventory-api/inventory-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-select-supplier',
  templateUrl: './select-supplier.component.html',
  styleUrls: ['./select-supplier.component.scss']
})
export class SelectSupplierComponent {

  constructor(
    private inventoryApi: InventoryApiService,
    private aggregateTable: AggregateTableService,
  ) { }

  @Output() rowSelected = new EventEmitter<object>();
  @Input() closeTarget = "";

  @ViewChild('openButtonElementReference', { read: ElementRef, static: false }) openButton!: ElementRef;
  @ViewChild('closeButtonElementReference', { read: ElementRef, static: false }) closeButton!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  supplierListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  tableColumns = ['supplier_code', 'supplier_name', 'phone'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 0;
  totalPages = 0;
  pageSize = 15;

  openModal(){
    this.supplierListData = [];
    this.getSupplierList();
    this.openButton.nativeElement.click();
  }

  getSupplierList(){
    this.isFetchingData = true;

    this.inventoryApi.getSupplierList()
      .then(
        (res: any) => {
          // console.log(res);
          this.supplierListData = res.docs;
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
    this.supplierListData = this.aggregateTable.filterData(this.supplierListData, this.filterText, this.tableColumns);
    this.supplierListData = this.aggregateTable.sortData(this.supplierListData, this.sortColumn, this.sortDirection);
    this.supplierListData = this.aggregateTable.paginateData(this.supplierListData, this.currentPage, this.pageSize);
  }

}
