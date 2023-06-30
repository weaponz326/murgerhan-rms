import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

import { MaintenanceApiService } from 'src/app/services/modules-api/maintenance-api/maintenance-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage {

  constructor(
    private elementRef: ElementRef,
    private maintenanceApi: MaintenanceApiService,
  ) { 
    Chart.register(...registerables);
  }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  systemListData: any[] = [];
  issueListData: any[] = [];
  serviceListData: any[] = [];
  contractorListData: any[] = [];

  numberOfSystems = 0;
  issuesThisWeek = 0;
  servicesThisWeek = 0;
  numberOfContractors = 0;

  issuesWeekDataSets: any[] = [];
  issuesWeekLabels: any[] = [];
  issuesLineChartConfig: any;

  servicesWeekDataSets: any[] = [];
  servicesWeekLabels: any[] = [];
  servicesLineChartConfig: any;
  
  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  ngOnInit(): void {
    this.getSystemList();
    this.getIssueList();
    this.getServiceList();
    this.getContractorList();
  }

  ngAfterViewInit(): void {
    this.initIssuesLineChart();
    this.initServicesLineChart();
  }

  initIssuesLineChart(){
    let issuesLineChartElement = this.elementRef.nativeElement.querySelector('#issuesLineChart')

    this.issuesLineChartConfig = new Chart(issuesLineChartElement, {
      type: "line",
      data: {
        labels: this.issuesWeekLabels,
        datasets: [{
          label: "Issues",
          data: this.issuesWeekDataSets,
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

  initServicesLineChart(){
    let servicesLineChartElement = this.elementRef.nativeElement.querySelector('#servicesLineChart')

    this.servicesLineChartConfig = new Chart(servicesLineChartElement, {
      type: "line",
      data: {
        labels: this.servicesWeekLabels,
        datasets: [{
          label: "Services",
          data: this.servicesWeekDataSets,
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

  getSystemList(){
    this.isFetchingData = true;

    this.maintenanceApi.getSystemList()
      .then(
        (res: any) => {
          console.log(res);
          this.systemListData = res.docs;
          this.isFetchingData = false;

          this.numberOfSystems = this.systemListData.length;
        },
        (err: any) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  getIssueList(){
    this.isFetchingData = true;

    this.maintenanceApi.getIssueList()
      .then(
        (res: any) => {
          console.log(res);
          this.issueListData = res.docs;
          this.isFetchingData = false;

          this.setIssueMetrics();
          this.setIssuesPerDay();
        },
        (err: any) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  getServiceList(){
    this.isFetchingData = true;

    this.maintenanceApi.getServiceList()
      .then(
        (res: any) => {
          console.log(res);
          this.serviceListData = res.docs;
          this.isFetchingData = false;    
          
          this.setServiceMetrics();
          this.setServicesPerDay();
        },
        (err: any) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  getContractorList(){
    this.isFetchingData = true;

    this.maintenanceApi.getContractorList()
      .then(
        (res: any) => {
          console.log(res);
          this.contractorListData = res.docs;
          this.isFetchingData = false;

          this.numberOfContractors = this.contractorListData.length;
        },
        (err: any) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  setIssueMetrics(){
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    this.issuesThisWeek = this.issueListData
      .filter(obj => {
        const createdAtDate = new Date(obj.data().created_at.toDate());
        return createdAtDate.toDateString() > sevenDaysAgo.toDateString();
      }).length
  }

  setServiceMetrics(){
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    this.servicesThisWeek = this.serviceListData
      .filter(obj => {
        const createdAtDate = new Date(obj.data().created_at.toDate());
        return createdAtDate.toDateString() > sevenDaysAgo.toDateString();
      }).length
  }

  setIssuesPerDay(){
    const currentDate = new Date();

    this.issuesWeekDataSets = [];
    this.issuesWeekLabels = [];

    for (let i = 29; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const objectsForDay = this.issueListData.filter((obj) => {
        const createdAt = new Date(obj.data().created_at.toDate());
        return createdAt >= date && createdAt < new Date(date.getTime() + 24 * 60 * 60 * 1000);
      });

      this.issuesWeekDataSets.push(objectsForDay.length);
      this.issuesWeekLabels.push(date.toISOString().split('T')[0]);
    }

    this.issuesLineChartConfig.destroy();
    this.initIssuesLineChart();
    console.log(this.issuesWeekLabels, this.issuesWeekDataSets);
  }

  setServicesPerDay(){
    const currentDate = new Date();

    this.servicesWeekDataSets = [];
    this.servicesWeekLabels = [];

    for (let i = 29; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const objectsForDay = this.serviceListData.filter((obj) => {
        const createdAt = new Date(obj.data().created_at.toDate());
        return createdAt >= date && createdAt < new Date(date.getTime() + 24 * 60 * 60 * 1000);
      });

      this.servicesWeekDataSets.push(objectsForDay.length);
      this.servicesWeekLabels.push(date.toISOString().split('T')[0]);
    }

    this.servicesLineChartConfig.destroy();
    this.initServicesLineChart();
    console.log(this.servicesWeekLabels, this.servicesWeekDataSets);
  }

}
