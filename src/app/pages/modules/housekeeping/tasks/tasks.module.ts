import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TasksRoutingModule } from './tasks-routing.module';
import { ModuleUtilitiesModule } from 'src/app/components/module-utilities/module-utilities.module';
import { UsersWindowsModule } from 'src/app/components/select-windows/users-windows/users-windows.module';
import { HousekeepingWindowsModule } from 'src/app/components/select-windows/housekeeping-windows/housekeeping-windows.module';

import { TasksPage } from './tasks.page';
import { AllTasksComponent } from './all-tasks/all-tasks.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { AddTaskItemComponent } from './add-task-item/add-task-item.component';
import { EditTaskItemComponent } from './edit-task-item/edit-task-item.component';
import { TaskItemFormComponent } from './task-item-form/task-item-form.component';
import { TaskItemsComponent } from './task-items/task-items.component';


@NgModule({
  declarations: [
    TasksPage,
    AllTasksComponent,
    NewTaskComponent,
    ViewTaskComponent,
    AddTaskItemComponent,
    EditTaskItemComponent,
    TaskItemFormComponent,
    TaskItemsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TasksRoutingModule,
    ModuleUtilitiesModule,
    UsersWindowsModule,
    HousekeepingWindowsModule
  ]
})
export class TasksModule { }
