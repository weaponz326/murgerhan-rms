import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchedulesRoutingModule } from './schedules-routing.module';
import { SchedulesPage } from './schedules.page';
import { AllSchedulesComponent } from './all-schedules/all-schedules.component';
import { NewScheduleComponent } from './new-schedule/new-schedule.component';
import { ViewScheduleComponent } from './view-schedule/view-schedule.component';
import { ScheduleSheetComponent } from './schedule-sheet/schedule-sheet.component';
import { AddScheduleTaskComponent } from './add-schedule-task/add-schedule-task.component';
import { EditScheduleTaskComponent } from './edit-schedule-task/edit-schedule-task.component';
import { ScheduleTaskFormComponent } from './schedule-task-form/schedule-task-form.component';


@NgModule({
  declarations: [
    SchedulesPage,
    AllSchedulesComponent,
    NewScheduleComponent,
    ViewScheduleComponent,
    ScheduleSheetComponent,
    AddScheduleTaskComponent,
    EditScheduleTaskComponent,
    ScheduleTaskFormComponent
  ],
  imports: [
    CommonModule,
    SchedulesRoutingModule
  ]
})
export class SchedulesModule { }
