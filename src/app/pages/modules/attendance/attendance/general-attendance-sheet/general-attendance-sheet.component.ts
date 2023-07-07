import { formatDate } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AttendanceApiService } from 'src/app/services/modules-api/attendance-api/attendance-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-general-attendance-sheet',
  templateUrl: './general-attendance-sheet.component.html',
  styleUrls: ['./general-attendance-sheet.component.scss']
})
export class GeneralAttendanceSheetComponent {

  constructor(
    private router: Router,
    private attendanceApi: AttendanceApiService
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  sheetDates: Date[] = [];

  attendanceData: any;
  personnelListData: any;
  sheetListData: any;

  isFetchingData = false;

  ngOnInit(): void {
    this.getAttendance();
  }

  getAttendance() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('attendance_attendance_id') as string;

    this.attendanceApi.getAttendance(id)
      .then((res) => {
        console.log(res);
        this.attendanceData = res;

        this.getDateRange(new Date(this.attendanceData.data().from_date), new Date(this.attendanceData.data().to_date));
        this.getAttendancePersonnelList();
      }),
      (err: any) => {
        console.log(err);
        this.connectionToast.openToast();
      };
  }

  getAttendancePersonnelList(){
    this.isFetchingData = true;

    this.attendanceApi.getAttendancePersonnelList()
      .then(
        (res: any) => {
          console.log(res);
          this.personnelListData = res.docs;
          this.isFetchingData = false;   
          
          this.getGeneralAttendanceSheetList();        
        },
        (err: any) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  getGeneralAttendanceSheetList() {
    this.isFetchingData = true;

    this.attendanceApi.getGeneralAttendanceSheetList()
      .then((res) => {
        console.log(res);
        this.sheetListData = res.docs;
        this.isFetchingData = false;
      }),
      (err: any) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  viewUserAttendance(userId: any){
    sessionStorage.setItem('attendance_user_id', userId);
    this.router.navigateByUrl("/modules/attendance/attendance/user-attendance")
  }

  viewDayAttendance(date: any){
    sessionStorage.setItem("selected_attendance_date", date.toISOString());
    this.router.navigateByUrl("/modules/attendance/attendance/day-attendance")
  }

  getDateRange(startDate: Date, endDate: Date) {
    this.sheetDates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      this.sheetDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  dateFormat(date: any){
    return formatDate(date, 'yyyy-MM-dd', 'en-US');
  }
  
}
