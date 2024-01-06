import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { FactoryApiService } from 'src/app/services/modules-api/factory-api/factory-api.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-view-monthly-order',
  templateUrl: './view-monthly-order.component.html',
  styleUrls: ['./view-monthly-order.component.scss']
})
export class ViewMonthlyOrderComponent {

  constructor(
    private router: Router,
    private factoryApi: FactoryApiService,
    private formatId: FormatIdService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  monthlyOrderDate = sessionStorage.getItem('factory_monthly_order_date') as string;
  orderItemListData: any[] = [];
  factoryItemListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  ngOnInit(): void {
    this.getAllBranchOrderItemList();
  }

  getAllBranchOrderItemList(){
    this.isFetchingData = true;

    this.factoryApi.getAllBranchOrderItemList()
      .then(
        (res: any) => {
          // console.log(res);
          this.orderItemListData = res.docs;

          this.orderItemListData = res.docs.filter((data: any) => {
            return new Date (data.data().order.data.order_date).getMonth() === new Date (this.monthlyOrderDate).getMonth(); // Month is 0-indexed
          });
            
          this.getFactoryItemList();
        },
        (err: any) => {
          console.log(err);
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
          console.log(res.docs[0].id);
          this.factoryItemListData = res.docs;
          this.isFetchingData = false;
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  getDate(date: any){
    return new Date(date).getDate()
  }

  getMonth(orderDate: Date): string {
    return orderDate ? new Date(orderDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '';
  }

  getFormatId(id: any){
    return this.formatId.formatId(id, 5, "#", "FO");
  }

  getItemQuantityForDay(itemId: string, day: number) {
    const relevantOrders = this.orderItemListData.filter(data => {
      const orderDay = new Date(data.data().order?.data?.order_date).getDate();
      const factoryItemId = data.data().factory_item?.id;

      return factoryItemId === itemId && orderDay === day;
    });

    if (relevantOrders.length > 0) {
        return relevantOrders.reduce((total, item) => total + item.data().quantity, 0);
    } else {
        return null;
    }
  }

  getTotalQuantityForMonth(itemId: string) {
    // Filter orderItemListData based on itemId
    const relevantOrders = this.orderItemListData.filter(data => {
      const factoryItemId = data.data().factory_item?.id;

      // Check if the item ID matches
      return factoryItemId === itemId;
    });

    // Calculate and return the total quantity for the month
    return this.daysInMonth.reduce((total, day) => {
      // Sum up the quantities for each day
      const quantityForDay = relevantOrders
        .filter(data => new Date(data.data().order?.data?.order_date).getDate() === day)
        .reduce((dayTotal, data) => dayTotal + data.data().quantity, 0);

      return total + quantityForDay;
    }, 0);
  }

}
