import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConfigurationPage } from './configuration.page';


const routes: Routes = [
  { 
    path: "", 
    component: ConfigurationPage, 
    canActivateChild: [() => { return !!localStorage.getItem('uid'); }],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
