import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TasksPage } from './tasks.page';
import { AllTasksComponent } from './all-tasks/all-tasks.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { InspectTaskComponent } from './inspect-task/inspect-task.component';
import { TaskImagesComponent } from './task-images/task-images.component';
import { viewTaskGuard } from 'src/app/guards/modules/housekeeping/view-task/view-task.guard';


const routes: Routes = [
  { 
    path: "", 
    component: TasksPage,
    children: [
      { path: "", component: AllTasksComponent },
      { path: "all-tasks", component: AllTasksComponent },
      { path: "new-task", component: NewTaskComponent },
      { path: "view-task", component: ViewTaskComponent, canActivate: [viewTaskGuard] },
      { path: "inspect-task", component: InspectTaskComponent, canActivate: [viewTaskGuard] },
      { path: "task-images", component: TaskImagesComponent, canActivate: [viewTaskGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
