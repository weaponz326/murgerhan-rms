import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksPage } from './tasks.page';
import { AllTasksComponent } from './all-tasks/all-tasks.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { TaskFormComponent } from './task-form/task-form.component';


@NgModule({
  declarations: [
    TasksPage,
    AllTasksComponent,
    AddTaskComponent,
    EditTaskComponent,
    TaskFormComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule
  ]
})
export class TasksModule { }
