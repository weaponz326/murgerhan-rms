import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { InventoryApiService } from 'src/app/services/modules-api/inventory-api/inventory-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-all-suppliers',
  templateUrl: './all-suppliers.component.html',
  styleUrls: ['./all-suppliers.component.scss']
})
export class AllSuppliersComponent {

  constructor(
    private router: Router,
    private inventoryApi: InventoryApiService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  supplierListData: any[] = [];

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
    this.getSupplierList();
  }

  getSupplierList(){
    this.isFetchingData = true;

    this.inventoryApi.getSupplierList(this.defaultPageSize, this.currentPageNumber, this.sorting, this.querying)
      .then(
        (res: any) => {
          console.log(res);
          this.supplierListData = res.docs;
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

  viewSupplier(supplierId: any){
    console.log(supplierId);

    sessionStorage.setItem("inventory_supplier_id", supplierId);
    this.router.navigateByUrl("/modules/inventory/suppliers/view-supplier");
  }

  changePage(page: any){
    this.currentPageNumber = page;
    this.getSupplierList();
  }
  
}
