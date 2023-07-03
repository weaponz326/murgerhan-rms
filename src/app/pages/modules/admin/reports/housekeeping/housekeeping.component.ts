import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { HousekeepingApiService } from 'src/app/services/modules-api/housekeeping-api/housekeeping-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-housekeeping',
  templateUrl: './housekeeping.component.html',
  styleUrls: ['./housekeeping.component.scss']
})
export class HousekeepingComponent {

  constructor(
    private router: Router,
    private housekeepingApi: HousekeepingApiService,
    private aggregateTable: AggregateTableService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  modules = ["Tasks", "Incidents"];
  
  selectedModule = "";
  startDate: any;
  endDate: any;

  numberOfTasks: any;
  todoTasks: any;
  numberOfIncidents: any;
  unresolvedIncidents: any;

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  taskListData: any[] = [];

  taskTableColumns = ['task_code', 'task_name', 'from_data', 'to_date', 'task_type', 'task_status'];
  taskFilterText = "";
  taskSortDirection = "";
  taskSortColumn = "";
  taskCurrentPage = 0;
  taskTotalPages = 0;
  taskPageSize = 25;

  incidentListData: any[] = [];

  incidentTableColumns = ['incident_code', 'incident_subject', 'incident_date', 'incident_status'];
  incidentFilterText = "";
  incidentSortDirection = "";
  incidentSortColumn = "";
  incidentCurrentPage = 0;
  incidentTotalPages = 0;
  incidentPageSize = 25;

  ngOnInit(): void {
    this.getTaskList();
    this.getIncidentList();
  }

  getTaskList(){
    this.isFetchingData = true;

    this.housekeepingApi.getTaskList()
      .then(
        (res: any) => {
          console.log(res);
          this.taskListData = res.docs;
          this.isFetchingData = false;

          this.taskTotalPages = Math.ceil(res.docs.length / this.taskPageSize);
          if(res.docs.length == 0){
            this.isDataAvailable = false;
          }
          else{
            this.isDataAvailable = true;
            this.taskCurrentPage = 1
          }

          this.aggregateTaskData();
          this.getTaskMetrics();
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

          this.incidentTotalPages = Math.ceil(res.docs.length / this.incidentPageSize);
          if(res.docs.length == 0){
            this.isDataAvailable = false;
          }
          else{
            this.isDataAvailable = true;
            this.taskCurrentPage = 1
          }

          this.aggregateIncidentData();
          this.getIncidentMetrics();
        },
        (err: any) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  aggregateTaskData(){
    console.log("lets aggregate this table's data...");
    this.taskListData = this.aggregateTable.filterData(this.taskListData, this.taskFilterText, this.taskTableColumns);
    this.taskListData = this.aggregateTable.sortData(this.taskListData, this.taskSortColumn, this.taskSortDirection);
    this.taskListData = this.aggregateTable.paginateData(this.taskListData, this.taskCurrentPage, this.taskPageSize);
    this.taskListData = this.aggregateTable.getDataRange(this.taskListData, this.startDate, this.endDate);
  }

  aggregateIncidentData(){
    console.log("lets aggregate this table's data...");
    this.incidentListData = this.aggregateTable.filterData(this.incidentListData, this.incidentFilterText, this.incidentTableColumns);
    this.incidentListData = this.aggregateTable.sortData(this.incidentListData, this.incidentSortColumn, this.incidentSortDirection);
    this.incidentListData = this.aggregateTable.paginateData(this.incidentListData, this.incidentCurrentPage, this.incidentPageSize);
    this.incidentListData = this.aggregateTable.getDataRange(this.incidentListData, this.startDate, this.endDate);
  }

  getTaskMetrics(){
    this.numberOfTasks = this.taskListData.length;
    this.todoTasks = this.taskListData.filter(obj => obj.data().task_status === "To Do").length;
  }

  getIncidentMetrics(){
    this.numberOfIncidents = this.incidentListData.length;
    this.unresolvedIncidents = this.incidentListData.filter(obj => obj.data().incident_status === "Unresolved").length;
  }

}
