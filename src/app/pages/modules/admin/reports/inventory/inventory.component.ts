import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { InventoryApiService } from 'src/app/services/modules-api/inventory-api/inventory-api.service';
import { InventoryPrintService } from 'src/app/services/modules-print/inventory-print/inventory-print.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent {

  constructor(
    private router: Router,
    private inventoryApi: InventoryApiService,
    private inventoryPrint: InventoryPrintService,
    private aggregateTable: AggregateTableService,
    private formatId: FormatIdService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  modules = ["Purchasing"];
  
  selectedModule = "";
  startDate: any;
  endDate: any;

  numberOfPurchasings: any;
  totalPurchased: any;

  purchasingListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  tableColumns = ['purchasing_code', 'purchasing_date', 'supplier_name', 'total_price'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 0;
  totalPages = 0;
  pageSize = 25;

  ngOnInit(): void {
    this.getPurchasingList();
  }

  getPurchasingList(){
    this.isFetchingData = true;

    this.inventoryApi.getPurchasingList()
      .then(
        (res: any) => {
          // console.log(res);
          this.purchasingListData = res.docs;
          this.isFetchingData = false;

          this.totalPages = Math.ceil(res.docs.length / this.pageSize);
          if(res.docs.length == 0){
            this.isDataAvailable = false;
          }
          else{
            this.isDataAvailable = true;
            this.currentPage = 1
          }

          this.aggregateData();
          this.getMetrics();
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  aggregateData(){
    // console.log("lets aggregate this table's data...");
    this.purchasingListData = this.aggregateTable.filterData(this.purchasingListData, this.filterText, this.tableColumns);
    this.purchasingListData = this.aggregateTable.sortData(this.purchasingListData, this.sortColumn, this.sortDirection);
    this.purchasingListData = this.aggregateTable.paginateData(this.purchasingListData, this.currentPage, this.pageSize);
    this.purchasingListData = this.aggregateTable.getDataRange(this.purchasingListData, this.startDate, this.endDate);
  }

  getFormatId(id: any){
    return this.formatId.formatId(id, 5, "#", "PC");
  }

  getMetrics(){
    this.numberOfPurchasings = this.purchasingListData.length;
    this.totalPurchased = this.purchasingListData.reduce((accumulator, currentObject) => accumulator + currentObject.data().total_price, 0);
  }

  onPrint(){
    // console.log("lets start printing...");

    let dates = { 'startDate' : this.startDate, 'endDate' : this.endDate }
    let metrics = {
      'numberOfPurchasings' : this.numberOfPurchasings,
      'totalPurchased' : this.totalPurchased
    }

    this.inventoryPrint.printPurchasingsReport(this.purchasingListData, metrics, dates);
  }

}
