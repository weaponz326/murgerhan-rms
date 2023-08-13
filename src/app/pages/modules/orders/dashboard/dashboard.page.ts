import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';

import { OrdersApiService } from 'src/app/services/modules-api/orders-api/orders-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage {

  constructor(
    private elementRef: ElementRef,
    private ordersApi: OrdersApiService,
  ) { 
    Chart.register(...registerables);
  }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  productListData: any[] = [];
  vendorListData: any[] = [];
  orderListData: any[] = [];

  numberOfProducts = 0;
  ordersToday = 0;
  salesToday = 0;
  numberOfVendors = 0;

  ordersWeekDataSets: any[] = [];
  ordersWeekLabels: any[] = [];
  ordersLineChartConfig: any;

  salesWeekDataSets: any[] = [];
  salesWeekLabels: any[] = [];
  salesLineChartConfig: any;

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  ngOnInit(): void {
    this.getProductList();
    this.getVendorList();
    this.getOrderList();
  }

  ngAfterViewInit(): void {
    this.initOrdersLineChart();
    this.initSalesLineChart();
  }

  initOrdersLineChart(){
    let ordersLineChartElement = this.elementRef.nativeElement.querySelector('#ordersLineChart')

    this.ordersLineChartConfig = new Chart(ordersLineChartElement, {
      type: "line",
      data: {
        labels: this.ordersWeekLabels,
        datasets: [{
          label: "Orders",
          data: this.ordersWeekDataSets,
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

  initSalesLineChart(){
    let salesLineChartElement = this.elementRef.nativeElement.querySelector('#salesLineChart')

    this.salesLineChartConfig = new Chart(salesLineChartElement, {
      type: "line",
      data: {
        labels: this.salesWeekLabels,
        datasets: [{
          label: "Orders",
          data: this.salesWeekDataSets,
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

  getProductList(){
    this.isFetchingData = true;

    this.ordersApi.getProductList()
      .then(
        (res: any) => {
          // console.log(res);
          this.productListData = res.docs;
          this.isFetchingData = false;

          this.numberOfProducts = this.productListData.length;
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  getVendorList(){
    this.isFetchingData = true;

    this.ordersApi.getVendorList()
      .then(
        (res: any) => {
          // console.log(res);
          this.vendorListData = res.docs;
          this.isFetchingData = false;

          this.numberOfVendors = this.vendorListData.length;
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

    this.ordersApi.getOrderList()
      .then(
        (res: any) => {
          // console.log(res);
          this.orderListData = res.docs;
          this.isFetchingData = false;

          this.setOrderMetrics();
          this.setOrdersPerDay();
          this.setSalesPerDay();
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  setOrderMetrics(){
    // const sevenDaysAgo = new Date();
    // sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const today = new Date();

    this.salesToday = this.orderListData
      .filter(obj => {
        const createdAtDate = new Date(obj.data().created_at.toDate());
        return createdAtDate.toDateString() == today.toDateString();
      })
      .reduce((accumulator, currentObject) => accumulator + currentObject.data().order_total, 0);

    this.ordersToday = this.orderListData
      .filter(obj => {
        const createdAtDate = new Date(obj.data().created_at.toDate());
        return createdAtDate.toDateString() == today.toDateString();
      }).length;
  }

  setOrdersPerDay(){
    const currentDate = new Date();

    this.ordersWeekDataSets = [];
    this.ordersWeekLabels = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const objectsForDay = this.orderListData.filter((obj) => {
        const createdAt = new Date(obj.data().created_at.toDate());
        return createdAt >= date && createdAt < new Date(date.getTime() + 24 * 60 * 60 * 1000);
      });

      this.ordersWeekDataSets.push(objectsForDay.length);
      this.ordersWeekLabels.push(date.toISOString().split('T')[0]);
    }

    this.ordersLineChartConfig.destroy();
    this.initOrdersLineChart();
    // console.log(this.ordersWeekLabels, this.ordersWeekDataSets);
  }
  
  setSalesPerDay(){
    const currentDate = new Date();
  
    this.salesWeekDataSets = [];
    this.salesWeekLabels = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
  
      const objectsForDay = this.orderListData.filter((obj) => {
        const createdAt = new Date(obj.data().created_at.toDate());
        return createdAt >= date && createdAt < new Date(date.getTime() + 24 * 60 * 60 * 1000);
      });
  
      const sum = objectsForDay.reduce((acc, obj) => acc + obj.data().order_total, 0);
      this.salesWeekDataSets.push(sum);
      this.salesWeekLabels.push(date.toISOString().split('T')[0]);
    }
  
    this.salesLineChartConfig.destroy();
    this.initSalesLineChart();
    // console.log(this.salesWeekLabels, this.salesWeekDataSets);
  }
  
}
