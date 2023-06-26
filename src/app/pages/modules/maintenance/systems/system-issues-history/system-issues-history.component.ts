import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { MaintenanceApiService } from 'src/app/services/modules-api/maintenance-api/maintenance-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-system-issues-history',
  templateUrl: './system-issues-history.component.html',
  styleUrls: ['./system-issues-history.component.scss']
})
export class SystemIssuesHistoryComponent {

  constructor(
    private router: Router,
    private maintenanceApi: MaintenanceApiService,
    private aggregateTable: AggregateTableService,
  ) {}

  systemForm = new FormGroup({
    systemCode: new FormControl({value: '', disabled: true}),
    systemName: new FormControl({value: '', disabled: true}),
  })

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  systemData: any;
  issueListData: any[] = [];

  isDataAvailable: boolean =  true;
  isFetchingData = false;

  tableColumns = ['issue_code', 'issue_date', 'issue_subject'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 0;
  totalPages = 0;
  pageSize = 25;
  
  ngOnInit(): void {
    this.getSystem();
    this.getSystemIssueList();
  }

  getSystem() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('maintenance_system_id') as string;

    this.maintenanceApi.getSystem(id)
      .then((res) => {
        console.log(res);
        this.systemData = res;
        this.isFetchingData = false;
        this.setSystemData();        
      }),
      (err: any) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  setSystemData(){
    this.systemForm.controls.systemCode.setValue(this.systemData.data().system_code);
    this.systemForm.controls.systemName.setValue(this.systemData.data().system_name);
  }

  getSystemIssueList(){
    this.isFetchingData = true;

    this.maintenanceApi.getSystemIssueList()
      .then(
        (res: any) => {
          console.log(res);
          this.issueListData = res.docs;
          this.isFetchingData = false;

          this.totalPages = Math.ceil(res.docs.length / this.pageSize);
          if(res.docs.length == 0)
            this.isDataAvailable = false;
          else
            this.currentPage = 1

          this.aggregateData();
        },
        (err: any) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  gotoIssue(issueId: any){
    console.log(issueId);

    sessionStorage.setItem("maintenance_issue_id", issueId);
    this.router.navigateByUrl("/modules/maintenance/issues/view-issue");
  }

  aggregateData(){
    console.log("lets aggregate this table's data...");
    this.issueListData = this.aggregateTable.filterData(this.issueListData, this.filterText, this.tableColumns);
    this.issueListData = this.aggregateTable.sortData(this.issueListData, this.sortColumn, this.sortDirection);
    this.issueListData = this.aggregateTable.paginateData(this.issueListData, this.currentPage, this.pageSize);
  }

}
