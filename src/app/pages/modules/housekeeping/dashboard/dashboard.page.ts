import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

import { HousekeepingApiService } from 'src/app/services/modules-api/housekeeping-api/housekeeping-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage {

  constructor(
    private elementRef: ElementRef,
    private housekeepingApi: HousekeepingApiService,
  ) { 
    Chart.register(...registerables);
  }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  taskListData: any[] = [];
  unitListData: any[] = [];
  incidentListData: any[] = [];

  todoTasks = 0;
  numberOfUnits = 0;
  incidentsThisWeek = 0;

  incidentsWeekDataSets: any[] = [];
  incidentsWeekLabels: any[] = [];
  incidentsLineChartConfig: any;

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  ngOnInit(): void {
    this.getTaskList();
    this.getUnitList();
    this.getIncidentList();
  }

  ngAfterViewInit(): void {
    this.initIncidentsLineChart();
  }

  initIncidentsLineChart(){
    let incidentsLineChartElement = this.elementRef.nativeElement.querySelector('#incidentsLineChart')

    this.incidentsLineChartConfig = new Chart(incidentsLineChartElement, {
      type: "line",
      data: {
        labels: this.incidentsWeekLabels,
        datasets: [{
          label: "incidents",
          data: this.incidentsWeekDataSets,
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

  getTaskList(){
    this.isFetchingData = true;

    this.housekeepingApi.getTaskList()
      .then(
        (res: any) => {
          console.log(res);
          this.taskListData = res.docs;
          this.isFetchingData = false;

          this.todoTasks = this.taskListData.filter(obj => obj.data().task_status === "To Do").length;
        },
        (err: any) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  getUnitList(){
    this.isFetchingData = true;

    this.housekeepingApi.getUnitList()
      .then(
        (res: any) => {
          console.log(res);
          this.unitListData = res.docs;
          this.isFetchingData = false;

          this.numberOfUnits = this.unitListData.length;
        },
        (err: any) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  getIncidentList(){
    this.isFetchingData = true;

    this.housekeepingApi.getIncidentList()
      .then(
        (res: any) => {
          console.log(res);
          this.incidentListData = res.docs;
          this.isFetchingData = false;

          this.setIncidentMetrics();
          this.setIncidentsPerDay();
        },
        (err: any) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  setIncidentMetrics(){
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    this.incidentsThisWeek = this.incidentListData
      .filter(obj => {
        const createdAtDate = new Date(obj.data().created_at.toDate());
        return createdAtDate.toDateString() > sevenDaysAgo.toDateString();
      }).length
  }

  setIncidentsPerDay(){
    const currentDate = new Date();

    this.incidentsWeekDataSets = [];
    this.incidentsWeekLabels = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const objectsForDay = this.incidentListData.filter((obj) => {
        const createdAt = new Date(obj.data().created_at.toDate());
        return createdAt >= date && createdAt < new Date(date.getTime() + 24 * 60 * 60 * 1000);
      });

      this.incidentsWeekDataSets.push(objectsForDay.length);
      this.incidentsWeekLabels.push(date.toISOString().split('T')[0]);
    }

    this.incidentsLineChartConfig.destroy();
    this.initIncidentsLineChart();
    console.log(this.incidentsWeekLabels, this.incidentsWeekDataSets);
  }

}
