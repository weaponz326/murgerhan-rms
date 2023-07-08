import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { OrdersApiService } from 'src/app/services/modules-api/orders-api/orders-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-select-vendor',
  templateUrl: './select-vendor.component.html',
  styleUrls: ['./select-vendor.component.scss']
})
export class SelectVendorComponent {

  constructor(
    private ordersApi: OrdersApiService,
    private aggregateTable: AggregateTableService,
  ) { }

  @Output() rowSelected = new EventEmitter<object>();
  @Input() closeTarget = "";

  @ViewChild('openButtonElementReference', { read: ElementRef, static: false }) openButton!: ElementRef;
  @ViewChild('closeButtonElementReference', { read: ElementRef, static: false }) closeButton!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  vendorListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  tableColumns = ['vendor_code', 'vendor_name', 'phone'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 0;
  totalPages = 0;
  pageSize = 15;

  openModal(){
    this.vendorListData = [];
    this.getVendorList();
    this.openButton.nativeElement.click();
  }

  getVendorList(){
    this.isFetchingData = true;

    this.ordersApi.getVendorList()
      .then(
        (res: any) => {
          // console.log(res);
          this.vendorListData = res.docs;
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
    this.vendorListData = this.aggregateTable.filterData(this.vendorListData, this.filterText, this.tableColumns);
    this.vendorListData = this.aggregateTable.sortData(this.vendorListData, this.sortColumn, this.sortDirection);
    this.vendorListData = this.aggregateTable.paginateData(this.vendorListData, this.currentPage, this.pageSize);
  }

}
