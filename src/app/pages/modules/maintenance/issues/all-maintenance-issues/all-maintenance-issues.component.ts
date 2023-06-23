import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MaintenanceApiService } from 'src/app/services/modules-api/maintenance-api/maintenance-api.service';

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
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  issueListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPageSize = 0;
  currentPageNumber = 0;
  defaultPageSize = 25;
  sorting = {
    created_at: "desc",
    log_code: "",
    user: "",
    activity: ""
  };
  querying = {
    created_at: "",
    log_code: "",
    user: "",
    activity: ""
  }

  ngOnInit(): void {
    this.getIssueList();
  }

  getIssueList(){
    this.isFetchingData = true;

    this.maintenanceApi.getIssueList(this.defaultPageSize, this.currentPageNumber, this.sorting, this.querying)
      .then(
        (res: any) => {
          console.log(res);
          this.issueListData = res.docs;
          this.isFetchingData = false;

          if(res.docs.length == 0)
            this.isDataAvailable = false;
        },
        (err: any) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  viewIssue(issueId: any){
    console.log(issueId);

    sessionStorage.setItem("maintenance_issue_id", issueId);
    this.router.navigateByUrl("/modules/maintenance/issues/view-issue");
  }

  changePage(page: any){
    this.currentPageNumber = page;
    this.getIssueList();
  }
  
}
