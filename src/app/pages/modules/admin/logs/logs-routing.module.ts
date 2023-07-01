import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogsPage } from './logs.page';
import { AllLogsComponent } from './all-logs/all-logs.component';
import { LogDetailsComponent } from './log-details/log-details.component';


const routes: Routes = [
  { 
    path: "", 
    component: LogsPage,
    canActivateChild: [() => { return !!localStorage.getItem('uid'); }],
    children: [
      { path: "", component: AllLogsComponent },
      { path: "all-logs", component: AllLogsComponent },
      { path: "log-details", component: LogDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogsRoutingModule { }
