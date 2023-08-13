import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';

import { FactoryApiService } from 'src/app/services/modules-api/factory-api/factory-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage {

  constructor(
    private elementRef: ElementRef,
    private factoryApi: FactoryApiService,
  ) { 
    Chart.register(...registerables);
  }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  factoryItemListData: any[] = [];
  orderListData: any[] = [];

  numberOfFactoryItems = 0;
  salesThisWeek = 0;

  salesWeekDataSets: any[] = [];
  salesWeekLabels: any[] = [];
  salesLineChartConfig: any;

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  ngOnInit(): void {
    this.getFactoryItemList();
    this.getOrderList();
  }

  ngAfterViewInit(): void {
    this.initSalesLineChart();
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

  getFactoryItemList(){
    this.isFetchingData = true;

    this.factoryApi.getFactoryItemList()
      .then(
        (res: any) => {
          // console.log(res);
          this.factoryItemListData = res.docs;
          this.isFetchingData = false;

          this.numberOfFactoryItems = this.factoryItemListData.length;
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
          this.orderListData = res.docs;
          this.isFetchingData = false;

          this.setSalesMetrics();
          this.setSalesPerDay();
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  setSalesMetrics(){
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // const today = new Date();

    this.salesThisWeek = this.orderListData
      .filter(obj => {
        const createdAtDate = new Date(obj.data().created_at.toDate());
        return createdAtDate.toDateString() >= sevenDaysAgo.toDateString();
      })
      .reduce((accumulator, currentObject) => accumulator + currentObject.data().order_total, 0);
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
