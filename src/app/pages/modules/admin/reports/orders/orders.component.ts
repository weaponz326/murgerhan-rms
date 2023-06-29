import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { OrdersApiService } from 'src/app/services/modules-api/orders-api/orders-api.service';
import { OrdersPrintService } from 'src/app/services/modules-print/orders-print/orders-print.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';

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
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  modules = ["Orders"];
  
  selectedModule = "";
  startDate: any;
  endDate: any;

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
          console.log(res);
          this.orderListData = res.docs;
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

  aggregateData(){
    console.log("lets aggregate this table's data...");
    this.orderListData = this.aggregateTable.filterData(this.orderListData, this.filterText, this.tableColumns);
    this.orderListData = this.aggregateTable.sortData(this.orderListData, this.sortColumn, this.sortDirection);
    this.orderListData = this.aggregateTable.paginateData(this.orderListData, this.currentPage, this.pageSize);
    this.orderListData = this.aggregateTable.getDataRange(this.orderListData, this.startDate, this.endDate);
  }

  onPrint(){
    console.log("lets start printing...");
    this.ordersPrint.printOrderList();
  }

}
