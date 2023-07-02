import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { OrdersApiService } from 'src/app/services/modules-api/orders-api/orders-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.scss']
})
export class SelectProductComponent {

  constructor(
    private ordersApi: OrdersApiService,
    private aggregateTable: AggregateTableService,
  ) { }

  @Output() rowSelected = new EventEmitter<object>();
  @Input() closeTarget = "";

  @ViewChild('openButtonElementReference', { read: ElementRef, static: false }) openButton!: ElementRef;
  @ViewChild('closeButtonElementReference', { read: ElementRef, static: false }) closeButton!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  productListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  tableColumns = ['product_code', 'product_name', 'price'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 0;
  totalPages = 0;
  pageSize = 15;

  openModal(){
    this.productListData = [];
    this.getProductList();
    this.openButton.nativeElement.click();
  }

  getProductList(){
    this.isFetchingData = true;

    this.ordersApi.getProductList()
      .then(
        (res: any) => {
          console.log(res);
          this.productListData = res.docs;
          this.isFetchingData = false;

          this.totalPages = Math.ceil(res.docs.length / this.pageSize);
          if(res.docs.length == 0)
            this.isDataAvailable = false;
          else
            this.currentPage = 1

          this.aggregateData();
        },
        (err: any) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  selectRow(row: any){
    this.rowSelected.emit(row);
    this.closeButton.nativeElement.click();
    console.log(row);
  }
  
  aggregateData(){
    console.log("lets aggregate this table's data...");
    this.productListData = this.aggregateTable.filterData(this.productListData, this.filterText, this.tableColumns);
    this.productListData = this.aggregateTable.sortData(this.productListData, this.sortColumn, this.sortDirection);
    this.productListData = this.aggregateTable.paginateData(this.productListData, this.currentPage, this.pageSize);
  }
  
}
