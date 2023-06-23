import { Component, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { AttendanceApiService } from 'src/app/services/modules-api/attendance-api/attendance-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { NewAttendanceComponent } from '../new-attendance/new-attendance.component';


@Component({
  selector: 'app-all-attendance',
  templateUrl: './all-attendance.component.html',
  styleUrls: ['./all-attendance.component.scss']
})
export class AllAttendanceComponent {

  constructor(
    private router: Router,
    private attendanceApi: AttendanceApiService,
  ) { }

  @ViewChild('newAttendanceComponentReference', { read: NewAttendanceComponent, static: false }) newAttendance!: NewAttendanceComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  attendanceListData: any[] = [];

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
    this.getAttendanceList();
  }

  getAttendanceList(){
    this.isFetchingData = true;

    this.attendanceApi.getAttendanceList(this.defaultPageSize, this.currentPageNumber, this.sorting, this.querying)
      .then(
        (res: any) => {
          console.log(res);
          this.attendanceListData = res.docs;
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

  viewAttendance(attendanceId: any){
    console.log(attendanceId);

    sessionStorage.setItem("attendance_attendance_id", attendanceId);
    this.router.navigateByUrl("/modules/attendance/attendance/general-attendance");
  }

  changePage(page: any){
    this.currentPageNumber = page;
    this.getAttendanceList();
  }
  
}
