import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MaintenanceApiService } from 'src/app/services/modules-api/maintenance-api/maintenance-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-all-maintenance-issues',
  templateUrl: './all-maintenance-issues.component.html',
  styleUrls: ['./all-maintenance-issues.component.scss']
})
export class AllMaintenanceIssuesComponent {

  constructor(
    private router: Router,
    private maintenanceApi: MaintenanceApiService,
    private aggregateTable: AggregateTableService,
    private formatId: FormatIdService
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  issueListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  tableColumns = ['issue_code', 'issue_date', 'issue_subject', 'system_name'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 0;
  totalPages = 0;
  pageSize = 25;

  ngOnInit(): void {
    this.getIssueList();
  }

  getIssueList(){
    this.isFetchingData = true;

    this.maintenanceApi.getIssueList()
      .then(
        (res: any) => {
          // console.log(res);
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
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  viewIssue(issueId: any){
    // console.log(issueId);

    sessionStorage.setItem("maintenance_issue_id", issueId);
    this.router.navigateByUrl("/modules/maintenance/issues/view-issue");
  }

  aggregateData(){
    // console.log("lets aggregate this table's data...");
    this.issueListData = this.aggregateTable.filterData(this.issueListData, this.filterText, this.tableColumns);
    this.issueListData = this.aggregateTable.sortData(this.issueListData, this.sortColumn, this.sortDirection);
    this.issueListData = this.aggregateTable.paginateData(this.issueListData, this.currentPage, this.pageSize);
  }

  getFormatId(id: any){
    return this.formatId.formatId(id, 5, "#", "UE");
  }

}
