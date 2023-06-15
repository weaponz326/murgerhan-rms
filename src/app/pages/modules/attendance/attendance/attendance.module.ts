import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendancePage } from './attendance.page';
import { AllAttendanceComponent } from './all-attendance/all-attendance.component';
import { NewAttendanceComponent } from './new-attendance/new-attendance.component';
import { ViewAttendanceComponent } from './view-attendance/view-attendance.component';
import { ViewSheetComponent } from './view-sheet/view-sheet.component';
import { CheckAttendanceComponent } from './check-attendance/check-attendance.component';
import { StaffAttendanceHistoryComponent } from './staff-attendance-history/staff-attendance-history.component';
import { DailyCheckSheetComponent } from './daily-check-sheet/daily-check-sheet.component';


@NgModule({
  declarations: [
    AttendancePage,
    AllAttendanceComponent,
    NewAttendanceComponent,
    ViewAttendanceComponent,
    ViewSheetComponent,
    CheckAttendanceComponent,
    StaffAttendanceHistoryComponent,
    DailyCheckSheetComponent
  ],
  imports: [
    CommonModule,
    AttendanceRoutingModule
  ]
})
export class AttendanceModule { }
