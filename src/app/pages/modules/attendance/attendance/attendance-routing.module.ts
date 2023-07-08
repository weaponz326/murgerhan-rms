import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AttendancePage } from './attendance.page';
import { AllAttendanceComponent } from './all-attendance/all-attendance.component';
import { GeneralAttendanceRecordsComponent } from './general-attendance-records/general-attendance-records.component';
import { UserAttendanceRecordsComponent } from './user-attendance-records/user-attendance-records.component';
import { AttendancePersonnelComponent } from './attendance-personnel/attendance-personnel.component';
import { DayAttendanceRecordsComponent } from './day-attendance-records/day-attendance-records.component';

import { viewAttendanceGuard } from 'src/app/guards/modules/attendance/view-attendance/view-attendance.guard';


const routes: Routes = [
  { 
    path: "", 
    component: AttendancePage,
    children: [
      { path: "", component: AllAttendanceComponent },
      { path: "all-attendance", component: AllAttendanceComponent },
      { path: "general-attendance", component: GeneralAttendanceRecordsComponent, canActivate: [viewAttendanceGuard] },
      { path: "user-attendance", component: UserAttendanceRecordsComponent, canActivate: [viewAttendanceGuard] },
      { path: "attendance-personnel", component: AttendancePersonnelComponent, canActivate: [viewAttendanceGuard] },
      { path: "day-attendance", component: DayAttendanceRecordsComponent, canActivate: [viewAttendanceGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
