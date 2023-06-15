import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AttendancePage } from './attendance.page';
import { AllAttendanceComponent } from './all-attendance/all-attendance.component';
import { NewAttendanceComponent } from './new-attendance/new-attendance.component';
import { ViewAttendanceComponent } from './view-attendance/view-attendance.component';
import { ViewSheetComponent } from './view-sheet/view-sheet.component';
import { StaffAttendanceHistoryComponent } from './staff-attendance-history/staff-attendance-history.component';


const routes: Routes = [
  { 
    path: "", 
    component: AttendancePage,
    children: [
      { path: "", component: AllAttendanceComponent },
      { path: "all-attendance", component: AllAttendanceComponent },
      { path: "view-attendance", component: ViewAttendanceComponent },
      { path: "view-sheet", component: ViewSheetComponent },
      { path: "staff-attendnance-history", component: StaffAttendanceHistoryComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
