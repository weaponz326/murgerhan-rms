import { Component, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { AttendanceApiService } from 'src/app/services/modules-api/attendance-api/attendance-api.service';

import { NewRosterComponent } from '../new-roster/new-roster.component';
import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-all-roster',
  templateUrl: './all-roster.component.html',
  styleUrls: ['./all-roster.component.scss']
})
export class AllRosterComponent {

  constructor(
    private router: Router,
    private attendanceApi: AttendanceApiService,
  ) { }

  @ViewChild('newRosterComponentReference', { read: NewRosterComponent, static: false }) newRoster!: NewRosterComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  rosterListData: any[] = [];

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
    this.getRosterList();
  }

  getRosterList(){
    this.isFetchingData = true;

    this.attendanceApi.getRosterList(this.defaultPageSize, this.currentPageNumber, this.sorting, this.querying)
      .then(
        (res: any) => {
          console.log(res);
          this.rosterListData = res.docs;
          this.isFetchingData = false;
        },
        (err: any) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  viewRoster(rosterId: any){
    console.log(rosterId);

    sessionStorage.setItem("attendance_roster_id", rosterId);
    this.router.navigateByUrl("/modules/attendance/roster/view-roster");
  }

  changePage(page: any){
    this.currentPageNumber = page;
    this.getRosterList();
  }

}
