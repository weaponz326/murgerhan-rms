import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { OrdersApiService } from 'src/app/services/modules-api/orders-api/orders-api.service';
import { OrdersPrintService } from 'src/app/services/modules-print/orders-print/orders-print.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

  constructor(
    private router: Router,
    private ordersApi: OrdersApiService,
    private ordersPrint: OrdersPrintService,
    private aggregateTable: AggregateTableService,
    private formatId: FormatIdService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  modules = ["Orders"];
  
  selectedModule = "";
  startDate: any;
  endDate: any;

  numberOfOrders: any;
  totalSales: any;

  orderListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  tableColumns = ['order_code', 'order_date', 'vendor_name', 'total_price'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 0;
  totalPages = 0;
  pageSize = 25;

  ngOnInit(): void {
    this.getOrderList();
  }

  getOrderList(){
    this.isFetchingData = true;

    this.ordersApi.getOrderList()
      .then(
        (res: any) => {
          // console.log(res);
          this.orderListData = res.docs;
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
    this.orderListData = this.aggregateTable.filterData(this.orderListData, this.filterText, this.tableColumns);
    this.orderListData = this.aggregateTable.sortData(this.orderListData, this.sortColumn, this.sortDirection);
    this.orderListData = this.aggregateTable.paginateData(this.orderListData, this.currentPage, this.pageSize);
    this.orderListData = this.aggregateTable.getDataRange(this.orderListData, this.startDate, this.endDate);
  }

  getFormatId(id: any){
    return this.formatId.formatId(id, 5, "#", "RD");
  }

  getMetrics(){
    this.numberOfOrders = this.orderListData.length;
    this.totalSales = this.orderListData.reduce((accumulator, currentObject) => accumulator + currentObject.data().total_price, 0);
  }

  onPrint(){
    // console.log("lets start printing...");

    let dates = { 'startDate' : this.startDate, 'endDate' : this.endDate }
    let metrics = {
      'numberOfOrders' : this.numberOfOrders,
      'totalSales' : this.totalSales
    }

    this.ordersPrint.printOrdersReport(this.orderListData, metrics, dates);
  }

}
