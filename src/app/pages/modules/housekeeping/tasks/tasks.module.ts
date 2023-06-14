import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
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
    TasksRoutingModule
  ]
})
export class TasksModule { }
