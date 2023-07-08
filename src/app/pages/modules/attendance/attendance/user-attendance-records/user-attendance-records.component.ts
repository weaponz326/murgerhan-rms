import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AttendanceApiService } from 'src/app/services/modules-api/attendance-api/attendance-api.service';
import { UsersApiService } from 'src/app/services/modules-api/users-api/users-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-user-attendance-records',
  templateUrl: './user-attendance-records.component.html',
  styleUrls: ['./user-attendance-records.component.scss']
})
export class UserAttendanceRecordsComponent {

  constructor(
    private router: Router,
    private usersApi: UsersApiService,
    private attendanceApi: AttendanceApiService
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  userRoleData: any;
  attendanceData: any;
  sheetListData: any;

  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));

  totalHoursToday: number = 0;
  totalHoursThisWeek: number = 0;
  totalHoursThisMonth: number = 0;


  isFetchingData = false;
  isSavingUserRole = false;

  userForm = new FormGroup({
    staffCode: new FormControl({value: '', disabled: true}),
    fullName: new FormControl({value: '', disabled: true}),
    staffRole: new FormControl({value: '', disabled: true}),
    attendanceCode: new FormControl({value: '', disabled: true}),
    attendanceName: new FormControl({value: '', disabled: true}),
  })
  
  ngOnInit(): void {
    this.getUserRole();
    this.getAttendance();
    this.getUserAttendanceSheetList();
  }

  getUserRole() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('attendance_user_id') as string;

    this.usersApi.getUserRole(id)
      .then((res) => {
        // console.log(res);
        this.userRoleData = res;
        this.isFetchingData = false;
        this.setUserRoleData();        
      }),
      (err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  getAttendance() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('attendance_attendance_id') as string;

    this.attendanceApi.getAttendance(id)
      .then((res) => {
        // console.log(res);
        this.attendanceData = res;
        this.isFetchingData = false;
        this.setAttendanceData();        
      }),
      (err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  getUserAttendanceSheetList() {
    this.isFetchingData = true;

    this.attendanceApi.getUserAttendanceSheetList()
      .then((res) => {
        // console.log(res);
        this.sheetListData = res.docs;
        this.isFetchingData = false;
        this.calculateTotalHours();
      }),
      (err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  calculateTotalHours() {
    const currentDate = new Date();

    const todayEntries = this.sheetListData.filter((item: any) => this.isSameDate(new Date(item.data().date.toDate()), currentDate));
    const weekTodayEntries = this.sheetListData.filter((item: any) => this.isWithinWeek(new Date(item.data().date.toDate()), currentDate));
    const monthTodayEntries = this.sheetListData.filter((item: any) => this.isWithinMonth(new Date(item.data().date.toDate()), currentDate));

    this.totalHoursToday = this.calculateTotalHoursForEntries(todayEntries);
    this.totalHoursThisWeek = this.calculateTotalHoursForEntries(weekTodayEntries);
    this.totalHoursThisMonth = this.calculateTotalHoursForEntries(monthTodayEntries);
  }

  calculateTotalHoursForEntries(items: any) {
    let totalHours = 0;

    items.forEach((item: any) => {
      const clockedInTime = new Date(item.data().sheet.clocked_in);
      const clockedOutTime = new Date(item.data().sheet.clocked_out);
      const breakStartTime = new Date(item.data().sheet.started_break);
      const breakEndTime = new Date(item.data().sheet.ended_break);

      const hoursBeforeBreak = (breakStartTime.getTime() - clockedInTime.getTime()) / (1000 * 60 * 60);
      const hoursAfterBreak = (clockedOutTime.getTime() - breakEndTime.getTime()) / (1000 * 60 * 60);

      totalHours += hoursBeforeBreak + hoursAfterBreak;
    });

    // console.log(totalHours);
    return totalHours;
  }

  isSameDate(date1: Date, date2: Date): boolean {
    // console.log(date1, date2)
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  isWithinWeek(date: Date, currentDate: Date): boolean {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(currentDate.getDate() - 7);
    return date >= oneWeekAgo && date <= currentDate;
  }

  isWithinMonth(date: Date, currentDate: Date): boolean {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);
    return date >= oneMonthAgo && date <= currentDate;
  }

  setUserRoleData(){
    this.userForm.controls.staffCode.setValue(this.userRoleData.data().staff_code);
    this.userForm.controls.fullName.setValue(this.userRoleData.data().full_name);
    this.userForm.controls.staffRole.setValue(this.userRoleData.data().staff_role);
  }

  setAttendanceData(){
    this.userForm.controls.attendanceCode.setValue(this.attendanceData.data().attendance_code);
    this.userForm.controls.attendanceName.setValue(this.attendanceData.data().attendance_name);
  }

}
