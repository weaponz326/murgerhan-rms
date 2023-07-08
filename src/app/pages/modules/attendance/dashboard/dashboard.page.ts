import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';

import { AttendanceApiService } from 'src/app/services/modules-api/attendance-api/attendance-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage {

  constructor(
    private elementRef: ElementRef,
    private attendanceApi: AttendanceApiService,
  ) { 
    Chart.register(...registerables);
  }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  presentToday = 0;
  absentToday = 0;
  presentThisWeek = 0;
  absentThisWeek = 0;

  sheetListData: any;

  ngOnInit(): void {
    this.getBranchAttendanceSheetList();
  }

  getBranchAttendanceSheetList() {
    this.attendanceApi.getBranchAttendanceSheetList()
      .then((res) => {
        console.log(res.docs);
        this.sheetListData = res.docs;

        this.setTodayMetrics();
        this.setThisWeekMetrics();
      }),
      (err: any) => {
        console.log(err);
        this.connectionToast.openToast();
      };
  }

  setTodayMetrics(){
    // const sevenDaysAgo = new Date();
    // sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const today = new Date();

    this.presentToday = this.sheetListData
      .filter((obj: any) => {
        const createdAtDate = new Date(obj.data().created_at.toDate());
        return (
          createdAtDate.toDateString() == today.toDateString() &&
          obj.data().clocked_in != null
        );
      }).length;

      this.absentToday = this.sheetListData
      .filter((obj: any) => {
        const createdAtDate = new Date(obj.data().created_at.toDate());
        return (
          createdAtDate.toDateString() == today.toDateString() &&
          obj.data().clocked_in == null
        );
      }).length;
  }

  setThisWeekMetrics(){
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    this.presentToday = this.sheetListData
      .filter((obj: any) => {
        const createdAtDate = new Date(obj.data().created_at.toDate());
        return (
          createdAtDate.toDateString() > sevenDaysAgo.toDateString() &&
          obj.data().clocked_in != null
        )
      }).length;

      this.absentToday = this.sheetListData
      .filter((obj: any) => {
        const createdAtDate = new Date(obj.data().created_at.toDate());
        return (
          createdAtDate.toDateString() > sevenDaysAgo.toDateString() &&
          obj.data().clocked_in == null
        )
      }).length;
  }

}
