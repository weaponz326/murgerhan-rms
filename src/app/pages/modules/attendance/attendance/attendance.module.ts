import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { ModuleUtilitiesModule } from 'src/app/components/module-utilities/module-utilities.module';

import { AttendancePage } from './attendance.page';
import { AllAttendanceComponent } from './all-attendance/all-attendance.component';
import { NewAttendanceComponent } from './new-attendance/new-attendance.component';
import { GeneralAttendanceRecordsComponent } from './general-attendance-records/general-attendance-records.component';
import { GeneralAttendanceSheetComponent } from './general-attendance-sheet/general-attendance-sheet.component';
import { UserAttendanceRecordsComponent } from './user-attendance-records/user-attendance-records.component';
import { UserAttendanceSheetComponent } from './user-attendance-sheet/user-attendance-sheet.component';
import { AttendancePersonnelComponent } from './attendance-personnel/attendance-personnel.component';
import { DayAttendanceRecordsComponent } from './day-attendance-records/day-attendance-records.component';
import { DayAttendanceSheetComponent } from './day-attendance-sheet/day-attendance-sheet.component';


@NgModule({
  declarations: [
    AttendancePage,
    AllAttendanceComponent,
    NewAttendanceComponent,
    GeneralAttendanceRecordsComponent,
    GeneralAttendanceSheetComponent,
    UserAttendanceRecordsComponent,
    UserAttendanceSheetComponent,
    AttendancePersonnelComponent,
    DayAttendanceRecordsComponent,
    DayAttendanceSheetComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AttendanceRoutingModule,
    ModuleUtilitiesModule
  ]
})
export class AttendanceModule { }
