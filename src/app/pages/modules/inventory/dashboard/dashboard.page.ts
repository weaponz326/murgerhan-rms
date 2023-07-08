import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

import { InventoryApiService } from 'src/app/services/modules-api/inventory-api/inventory-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage {

  constructor(
    private elementRef: ElementRef,
    private inventoryApi: InventoryApiService,
  ) { 
    Chart.register(...registerables);
  }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
 
  stockItemListData: any[] = [];
  supplierListData: any[] = [];
  purchasingListData: any[] = [];

  numberOfItems = 0;
  outOfStockItems = 0;
  numberOfSuppliers = 0;

  purchasingsWeekDataSets: any[] = [];
  purchasingsWeekLabels: any[] = [];
  purchasingsLineChartConfig: any;

  amountPurchasedWeekDataSets: any[] = [];
  amountPurchasedWeekLabels: any[] = [];
  amountPurchasedLineChartConfig: any;

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  ngOnInit(): void {
    this.getStockItemList();
    this.getSupplierList();
    this.getPurchasingList();
  }

  ngAfterViewInit(): void {
    this.initPurchasingsLineChart();
    this.initAmountPurchasedLineChart();
  }

  initPurchasingsLineChart(){
    let purchasingsLineChartElement = this.elementRef.nativeElement.querySelector('#purchasingsLineChart')

    this.purchasingsLineChartConfig = new Chart(purchasingsLineChartElement, {
      type: "line",
      data: {
        labels: this.purchasingsWeekLabels,
        datasets: [{
          label: "Purchasings",
          data: this.purchasingsWeekDataSets,
          borderColor: "#0000ff88"
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      },
    });
  }

  initAmountPurchasedLineChart(){
    let amountpurchasedLineChartElement = this.elementRef.nativeElement.querySelector('#amountPurchasedLineChart')

    this.amountPurchasedLineChartConfig = new Chart(amountpurchasedLineChartElement, {
      type: "line",
      data: {
        labels: this.amountPurchasedWeekLabels,
        datasets: [{
          label: "Amount Purchased",
          data: this.amountPurchasedWeekDataSets,
          borderColor: "#0000ff88"
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          }
        }
      },
    });
  }

  getStockItemList(){
    this.isFetchingData = true;

    this.inventoryApi.getStockItemList()
      .then(
        (res: any) => {
          // console.log(res);
          this.stockItemListData = res.docs;
          this.isFetchingData = false;

          this.numberOfItems = this.stockItemListData.length;
          this.outOfStockItems = this.stockItemListData.filter(obj => obj.data().stock === 0).length;
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  getSupplierList(){
    this.isFetchingData = true;

    this.inventoryApi.getSupplierList()
      .then(
        (res: any) => {
          // console.log(res);
          this.supplierListData = res.docs;
          this.isFetchingData = false;   
          
          this.numberOfSuppliers = this.supplierListData.length;
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  getPurchasingList(){
    this.isFetchingData = true;

    this.inventoryApi.getPurchasingList()
      .then(
        (res: any) => {
          // console.log(res);
          this.purchasingListData = res.docs;
          this.isFetchingData = false;

          this.setPurchasingsPerDay();
          this.setAmountPurchasedPerDay();
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  setPurchasingsPerDay(){
    const currentDate = new Date();

    this.purchasingsWeekDataSets = [];
    this.purchasingsWeekLabels = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const objectsForDay = this.purchasingListData.filter((obj) => {
        const createdAt = new Date(obj.data().created_at.toDate());
        return createdAt >= date && createdAt < new Date(date.getTime() + 24 * 60 * 60 * 1000);
      });

      this.purchasingsWeekDataSets.push(objectsForDay.length);
      this.purchasingsWeekLabels.push(date.toISOString().split('T')[0]);
    }

    this.purchasingsLineChartConfig.destroy();
    this.initPurchasingsLineChart();
    // console.log(this.purchasingsWeekLabels, this.purchasingsWeekDataSets);
  }
  
  setAmountPurchasedPerDay(){
    const currentDate = new Date();
  
    this.amountPurchasedWeekDataSets = [];
    this.amountPurchasedWeekLabels = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
  
      const objectsForDay = this.purchasingListData.filter((obj) => {
        const createdAt = new Date(obj.data().created_at.toDate());
        return createdAt >= date && createdAt < new Date(date.getTime() + 24 * 60 * 60 * 1000);
      });
  
      const sum = objectsForDay.reduce((acc, obj) => acc + obj.data().total_price, 0);
      this.amountPurchasedWeekDataSets.push(sum);
      this.amountPurchasedWeekLabels.push(date.toISOString().split('T')[0]);
    }
  
    this.amountPurchasedLineChartConfig.destroy();
    this.initAmountPurchasedLineChart();
    // console.log(this.amountPurchasedWeekLabels, this.amountPurchasedWeekDataSets);
  }

}
