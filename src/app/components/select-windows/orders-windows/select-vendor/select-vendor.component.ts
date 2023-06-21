import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { OrdersApiService } from 'src/app/services/modules-api/orders-api/orders-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-select-vendor',
  templateUrl: './select-vendor.component.html',
  styleUrls: ['./select-vendor.component.scss']
})
export class SelectVendorComponent {

  constructor(private ordersApi: OrdersApiService) { }

  @Output() rowSelected = new EventEmitter<object>();
  @Input() closeTarget = "";

  @ViewChild('openButtonElementReference', { read: ElementRef, static: false }) openButton!: ElementRef;
  @ViewChild('closeButtonElementReference', { read: ElementRef, static: false }) closeButton!: ElementRef;

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

  openModal(){
    this.vendorListData = [];
    this.getVendorList();
    this.openButton.nativeElement.click();
  }

  getVendorList(){
    this.isFetchingData = true;

    this.ordersApi.getVendorList(this.defaultPageSize, this.currentPageNumber, this.sorting, this.querying)
      .then(
        (res: any) => {
          console.log(res);
          this.vendorListData = res.docs;
          this.isFetchingData = false;

          this.currentPageSize = res.docs.length;
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

  changePage(page: any){
    this.currentPageNumber = page;
    this.getVendorList();
  }

  selectRow(row: any){
    this.rowSelected.emit(row);
    this.closeButton.nativeElement.click();
    console.log(row);
  }

}
