import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { FactoryApiService } from 'src/app/services/modules-api/factory-api/factory-api.service';
import { AdminApiService } from 'src/app/services/modules-api/admin-api/admin-api.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

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
    private formatId: FormatIdService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  orderItemListData: any[] = [];
  factoryItemListData: any[] = [];
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
          this.getFactoryItemList();
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  getFactoryItemList(){
    this.isFetchingData = true;

    this.factoryApi.getFactoryItemList()
      .then(
        (res: any) => {
          // console.log(res);
          this.factoryItemListData = res.docs;
          this.isFetchingData = false;
          this.getMainOrderItemList();
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  getMainOrderItemList(){
    this.isFetchingData = true;

    this.factoryApi.getMainOrderItemList()
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

  getFormatId(id: any){
    return this.formatId.formatId(id, 4, "#", "FI");
  }

  hasMatchingItem(itemId: string, branchId: string): boolean {
    return this.orderItemListData.some(item =>
      item?.data()?.order?.data?.branch?.id === branchId && item?.data()?.factory_item?.id === itemId
    );
  }

  getItemQuantity(itemId: string, branchId: string): number {
    const matchingItem = this.orderItemListData.find(item =>
      item?.data()?.order?.data?.branch?.id === branchId && item?.data()?.factory_item?.id === itemId
    );
    return matchingItem?.data().quantity || 0;
  }

  getTotalPrice(itemId: string, branchId: string): number {
    const matchingItem = this.orderItemListData.find(item =>
      item?.data()?.order?.data?.branch?.id === branchId && item?.data()?.factory_item?.id === itemId
    );
    return (matchingItem?.data().quantity || 0) * (matchingItem?.data()?.factory_item?.data?.price || 0);
  }

  getTotalQuantity(itemId: string): number {
    return this.branchListData.reduce((total, branch) => total + this.getItemQuantity(itemId, branch.id), 0);
  }

  getTotalPriceForItem(itemId: string): number {
    return this.branchListData.reduce((total, branch) => total + this.getTotalPrice(itemId, branch.id), 0);
  }

  // getTotalPriceForBranch(branchId: string): number {
  //   return this.orderItemListData.reduce((total, item) => {
  //     const orderData = item?.data()?.order?.data;
  //     const factoryItemData = item?.data()?.factory_item?.data;
  
  //     if (orderData?.branch?.id === branchId) {
  //       const quantity = item?.data().quantity || 0;
  //       const price = factoryItemData?.price || 0;
  //       total += quantity * price;
  //     }
  
  //     return total;
  //   }, 0);
  // }
  
  getTotalPriceForBranch(branchId: string): number {
    return this.orderItemListData
      .filter(item => item?.data()?.order?.data?.branch?.id === branchId)
      .reduce((total, item) => {
        const quantity = item?.data().quantity || 0;
        const price = item?.data()?.factory_item?.data?.price || 0;
        return total + quantity * price;
      }, 0);
  }
  
}
