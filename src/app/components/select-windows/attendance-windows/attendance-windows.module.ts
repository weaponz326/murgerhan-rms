import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from '../../module-utilities/module-utilities.module';

import { SelectRosterComponent } from './select-roster/select-roster.component';
import { SelectShiftComponent } from './select-shift/select-shift.component';
import { SelectBatchComponent } from './select-batch/select-batch.component';
import { SelectAttendanceComponent } from './select-attendance/select-attendance.component';



@NgModule({
  declarations: [
    SelectRosterComponent,
    SelectShiftComponent,
    SelectBatchComponent,
    SelectAttendanceComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ],
  exports: [
    SelectRosterComponent,
    SelectShiftComponent,
    SelectBatchComponent,
    SelectAttendanceComponent
  ]
})
export class AttendanceWindowsModule { }
