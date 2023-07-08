import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MaintenanceApiService } from 'src/app/services/modules-api/maintenance-api/maintenance-api.service';
import { MaintenancePrintService } from 'src/app/services/modules-print/maintenance-print/maintenance-print.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent {

  constructor(
    private router: Router,
    private maintenanceApi: MaintenanceApiService,
    private maintenancePrint: MaintenancePrintService,
    private aggregateTable: AggregateTableService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  modules = ["Issues", "Services"];
  
  selectedModule = "";
  startDate: any;
  endDate: any;

  numberOfIssues: any;
  issuesNeedsFixing: any;
  numberOfServices: any;
  ongoingServices: any;
  totalServicesCost: any;

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  issueListData: any[] = [];

  issueTableColumns = ['issue_code', 'issue_date', 'issue_subject', 'system_name'];
  issueFilterText = "";
  issueSortDirection = "";
  issueSortColumn = "";
  issueCurrentPage = 0;
  issueTotalPages = 0;
  issuePageSize = 25;

  serviceListData: any[] = [];

  serviceTableColumns = ['service_code', 'service_subject', 'date_from', 'date_to', 'contractor_name'];
  serviceFilterText = "";
  serviceSortDirection = "";
  serviceSortColumn = "";
  serviceCurrentPage = 0;
  serviceTotalPages = 0;
  servicePageSize = 25;

  ngOnInit(): void {
    this.getIssueList();
    this.getServiceList();
  }

  getIssueList(){
    this.isFetchingData = true;

    this.maintenanceApi.getIssueList()
      .then(
        (res: any) => {
          console.log(res);
          this.issueListData = res.docs;
          this.isFetchingData = false;

          this.issueTotalPages = Math.ceil(res.docs.length / this.issuePageSize);
          if(res.docs.length == 0){
            this.isDataAvailable = false;
          }
          else{
            this.isDataAvailable = true;
            this.issueCurrentPage = 1
          }

          this.aggregateIssueData();
          this.getIssueMetrics();
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
          
          this.serviceTotalPages = Math.ceil(res.docs.length / this.servicePageSize);
          if(res.docs.length == 0){
            this.isDataAvailable = false;
          }
          else{
            this.isDataAvailable = true;
            this.serviceCurrentPage = 1
          }

          this.aggregateServiceData();
          this.getServiceMetrics();
        },
        (err: any) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  aggregateIssueData(){
    console.log("lets aggregate this table's data...");
    this.issueListData = this.aggregateTable.filterData(this.issueListData, this.issueFilterText, this.issueTableColumns);
    this.issueListData = this.aggregateTable.sortData(this.issueListData, this.issueSortColumn, this.issueSortDirection);
    this.issueListData = this.aggregateTable.paginateData(this.issueListData, this.issueCurrentPage, this.issuePageSize);
    this.issueListData = this.aggregateTable.getDataRange(this.issueListData, this.startDate, this.endDate);
  }

  aggregateServiceData(){
    console.log("lets aggregate this table's data...");
    this.serviceListData = this.aggregateTable.filterData(this.serviceListData, this.serviceFilterText, this.serviceTableColumns);
    this.serviceListData = this.aggregateTable.sortData(this.serviceListData, this.serviceSortColumn, this.serviceSortDirection);
    this.serviceListData = this.aggregateTable.paginateData(this.serviceListData, this.serviceCurrentPage, this.servicePageSize);
    this.serviceListData = this.aggregateTable.getDataRange(this.serviceListData, this.startDate, this.endDate);
  }

  getIssueMetrics(){
    this.numberOfIssues = this.issueListData.length;
    this.issuesNeedsFixing = this.issueListData.filter(obj => obj.data().task_status === "Needs Fixing").length;
  }

  getServiceMetrics(){
    this.numberOfServices = this.serviceListData.length;
    this.ongoingServices = this.serviceListData.filter(obj => obj.data().task_status === "Ongoing").length;
    this.totalServicesCost = this.serviceListData.reduce((accumulator, currentObject) => accumulator + currentObject.data().cost, 0);
  }

  onIssuesPrint(){
    console.log("lets start printing...");

    let dates = { 'startDate' : this.startDate, 'endDate' : this.endDate }
    let metrics = {
      'numberOfIssues' : this.numberOfIssues,
      'issuesNeedsFixing' : this.issuesNeedsFixing
    }

    this.maintenancePrint.printIssuesReport(this.issueListData, metrics, dates);
  }

  onServicesPrint(){
    console.log("lets start printing...");

    let dates = { 'startDate' : this.startDate, 'endDate' : this.endDate }
    let metrics = {
      'numberOfServices' : this.numberOfServices,
      'ongoingServices' : this.ongoingServices,
      'totalServicesCost' : this.totalServicesCost
    }

    this.maintenancePrint.printServicesReport(this.serviceListData, metrics, dates);
  }

}
