import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { OrdersApiService } from 'src/app/services/modules-api/orders-api/orders-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-vendor-history',
  templateUrl: './vendor-history.component.html',
  styleUrls: ['./vendor-history.component.scss']
})
export class VendorHistoryComponent {

  constructor(
    private router: Router,
    private ordersApi: OrdersApiService,
    private aggregateTable: AggregateTableService,
  ) {}

  vendorForm = new FormGroup({
    vendorCode: new FormControl({value: '', disabled: true}),
    vendorName: new FormControl({value: '', disabled: true}),
  })

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  vendorData: any;
  vendorOrderListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  tableColumns = ['order_code', 'order_date', 'total_price'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 0;
  totalPages = 0;
  pageSize = 15;

  ngOnInit(): void {
    this.getVendor();
    this.getVendorOrderList();
  }

  getVendor() {
    const id = sessionStorage.getItem('orders_vendor_id') as string;

    this.ordersApi.getVendor(id)
      .then((res) => {
        console.log(res);
        this.vendorData = res;
        this.setVendorData();        
      }),
      (err: any) => {
        console.log(err);
        this.connectionToast.openToast();
      };
  }

  getVendorOrderList(){
    this.isFetchingData = true;

    this.ordersApi.getVendorOrderList()
      .then(
        (res: any) => {
          console.log(res);
          this.vendorOrderListData = res.docs;
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

  setVendorData(){
    this.vendorForm.controls.vendorCode.setValue(this.vendorData.data().vendor_code);
    this.vendorForm.controls.vendorName.setValue(this.vendorData.data().vendor_name);
  }
  
  aggregateData(){
    console.log("lets aggregate this table's data...");
    this.vendorOrderListData = this.aggregateTable.filterData(this.vendorOrderListData, this.filterText, this.tableColumns);
    this.vendorOrderListData = this.aggregateTable.sortData(this.vendorOrderListData, this.sortColumn, this.sortDirection);
    this.vendorOrderListData = this.aggregateTable.paginateData(this.vendorOrderListData, this.currentPage, this.pageSize);
  }

  gotoOrder(orderId: any){
    sessionStorage.setItem("orders_order_id", orderId);
    this.router.navigateByUrl("/modules/orders/orders/view-order");
  }

}
