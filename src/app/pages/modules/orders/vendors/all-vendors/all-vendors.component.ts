import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { OrdersApiService } from 'src/app/services/modules-api/orders-api/orders-api.service';
import { OrdersPrintService } from 'src/app/services/modules-print/orders-print/orders-print.service';

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
    private ordersPrint: OrdersPrintService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  vendorListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPageSize = 0;
  currentPageNumber = 0;
  defaultPageSize = 25;
  sorting = {
    created_at: "desc",
    log_code: "",
    user: "",
    activity: ""
  };
  querying = {
    created_at: "",
    log_code: "",
    user: "",
    activity: ""
  }

  ngOnInit(): void {
    this.getVendorList();
  }

  getVendorList(){
    this.isFetchingData = true;

    this.ordersApi.getVendorList(this.defaultPageSize, this.currentPageNumber, this.sorting, this.querying)
      .then(
        (res: any) => {
          console.log(res);
          this.vendorListData = res.docs;
          this.isFetchingData = false;

          if(res.docs.length == 0)
            this.isDataAvailable = false;
        },
        (err: any) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  viewVendor(vendorId: any){
    console.log(vendorId);

    sessionStorage.setItem("orders_vendor_id", vendorId);
    this.router.navigateByUrl("/modules/orders/vendors/view-vendor");
  }

  changePage(page: any){
    this.currentPageNumber = page;
    this.getVendorList();
  }

  onPrint(){
    console.log("lets start printing...");
    this.ordersPrint.printVendorList();
  }

}
