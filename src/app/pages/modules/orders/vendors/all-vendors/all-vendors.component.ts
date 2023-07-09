import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { OrdersApiService } from 'src/app/services/modules-api/orders-api/orders-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-all-vendors',
  templateUrl: './all-vendors.component.html',
  styleUrls: ['./all-vendors.component.scss']
})
export class AllVendorsComponent {

  constructor(
    private router: Router,
    private ordersApi: OrdersApiService,
    private aggregateTable: AggregateTableService,
    private formatId: FormatIdService,
  ) { }

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
  pageSize = 25;

  ngOnInit(): void {
    this.getVendorList();
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

  viewVendor(vendorId: any){
    // console.log(vendorId);

    sessionStorage.setItem("orders_vendor_id", vendorId);
    this.router.navigateByUrl("/modules/orders/vendors/view-vendor");
  }

  aggregateData(){
    // console.log("lets aggregate this table's data...");
    this.vendorListData = this.aggregateTable.filterData(this.vendorListData, this.filterText, this.tableColumns);
    this.vendorListData = this.aggregateTable.sortData(this.vendorListData, this.sortColumn, this.sortDirection);
    this.vendorListData = this.aggregateTable.paginateData(this.vendorListData, this.currentPage, this.pageSize);
  }

  getFormatId(id: any){
    return this.formatId.formatId(id, 4, "#", "VE");
  }

}
