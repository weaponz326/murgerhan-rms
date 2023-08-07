import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { FactoryApiService } from 'src/app/services/modules-api/factory-api/factory-api.service';
import { AdminApiService } from 'src/app/services/modules-api/admin-api/admin-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-view-daily-factory-order',
  templateUrl: './view-daily-factory-order.component.html',
  styleUrls: ['./view-daily-factory-order.component.scss']
})
export class ViewDailyFactoryOrderComponent {

  constructor(
    private router: Router,
    private factoryApi: FactoryApiService,
    private adminApi: AdminApiService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  orderItemListData: any[] = [];
  branchListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  ngOnInit(): void {
    this.getBranchList();
  }

  getBranchList(){
    this.isFetchingData = true;

    this.adminApi.getBranchList()
      .then(
        (res: any) => {
          // console.log(res);
          this.branchListData = res.docs;
          this.isFetchingData = false;

          this.getOrderList();
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  getOrderList(){
    this.isFetchingData = true;

    this.factoryApi.getOrderList()
      .then(
        (res: any) => {
          // console.log(res);
          this.orderItemListData = res.docs;
          this.isFetchingData = false;
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  getTotalQuantity(data: any): number {
    let totalQuantity = 0;
    for (const branch of this.branchListData) {
      if (branch.id === data.data().branch.id) {
          totalQuantity += data.data().quantity;
      }
    }
    return totalQuantity;
  }

  getTotalPrice(data: any): number {
    let totalPrice = 0;
    for (const branch of this.branchListData) {
      if (branch.id === data.data().branch.id) {
          totalPrice += data.data().quantity * data.data().factory_item.price;
      }
    }
    return totalPrice;
  }

}
