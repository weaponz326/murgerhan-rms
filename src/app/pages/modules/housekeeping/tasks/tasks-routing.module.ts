import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TasksPage } from './tasks.page';
import { AllTasksComponent } from './all-tasks/all-tasks.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';


const routes: Routes = [
  { 
    path: "", 
    component: TasksPage,
    children: [
      { path: "", component: AllTasksComponent },
      { path: "all-tasks", component: AllTasksComponent },
      { path: "new-task", component: NewTaskComponent },
      { path: "view-task", component: ViewTaskComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
