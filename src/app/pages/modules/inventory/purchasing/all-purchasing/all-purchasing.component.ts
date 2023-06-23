import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { InventoryApiService } from 'src/app/services/modules-api/inventory-api/inventory-api.service';

import { NewPurchasingComponent } from '../new-purchasing/new-purchasing.component';
import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-all-purchasing',
  templateUrl: './all-purchasing.component.html',
  styleUrls: ['./all-purchasing.component.scss']
})
export class AllPurchasingComponent {

  constructor(
    private router: Router,
    private inventoryApi: InventoryApiService,
  ) { }

  @ViewChild('newPurchasingComponentReference', { read: NewPurchasingComponent, static: false }) newPurchasing!: NewPurchasingComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  purchasingListData: any[] = [];

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
    this.getPurchasingList();
  }

  getPurchasingList(){
    this.isFetchingData = true;

    this.inventoryApi.getPurchasingList(this.defaultPageSize, this.currentPageNumber, this.sorting, this.querying)
      .then(
        (res: any) => {
          console.log(res);
          this.purchasingListData = res.docs;
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

  viewPurchasing(purchasingId: any){
    console.log(purchasingId);

    sessionStorage.setItem("inventory_purchasing_id", purchasingId);
    this.router.navigateByUrl("/modules/inventory/purchasing/view-purchasing");
  }

  changePage(page: any){
    this.currentPageNumber = page;
    this.getPurchasingList();
  }

}
