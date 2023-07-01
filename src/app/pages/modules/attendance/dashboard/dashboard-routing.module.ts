import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardPage } from './dashboard.page';


const routes: Routes = [
  { 
    path: "", 
    component: DashboardPage, 
    canActivateChild: [() => { return !!localStorage.getItem('uid'); }],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
