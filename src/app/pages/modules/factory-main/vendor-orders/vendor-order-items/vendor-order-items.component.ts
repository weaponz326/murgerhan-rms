import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { FactoryApiService } from 'src/app/services/modules-api/factory-api/factory-api.service';
import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-vendor-order-items',
  templateUrl: './vendor-order-items.component.html',
  styleUrls: ['./vendor-order-items.component.scss']
})
export class VendorOrderItemsComponent {

  constructor(
    private router: Router,
    private factoryApi: FactoryApiService,
  ) { }

  @Output() setOrderTotal = new EventEmitter<any>();

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  orderItemListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  deleteId = "";
  isItemDeleting = false;

  lastItem = 0;
  totalPrice: number = 0.00;
  totalVat: number = 0.00;
  
  ngOnInit(): void {
    this.getVendorOrderItemList();
  }

  calculateOrderTotal(){
    this.calculateTotalPrice();
    this.calculateTotalVat();

    var orderTotal = this.totalPrice + this.totalVat
    this.setOrderTotal.emit(orderTotal);
    // console.log(orderTotal);
  }

  calculateTotalPrice(){
    this.totalPrice = 0;
    for (let item of this.orderItemListData){
      this.totalPrice += item.data().product.data.price * item.data().quantity;
    }

    // console.log(this.totalPrice);
  }

  calculateTotalVat(){
    this.totalVat = 0;
    for (let item of this.orderItemListData){
      this.totalVat += (item.data().product.data.price * item.data().quantity) * (item.data().product.data.vat / 100);
    }

    // console.log(this.totalVat);
  }

  getVendorOrderItemList(){
    this.isFetchingData = true;

    this.factoryApi.getVendorOrderItemList()
      .then(
        (res: any) => {
          // console.log(res);
          this.orderItemListData = res.docs;

          this.calculateTotalPrice();

          try { this.lastItem = res.docs.length }
          catch{ this.lastItem = 0 }

          this.isFetchingData = false;
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

}
