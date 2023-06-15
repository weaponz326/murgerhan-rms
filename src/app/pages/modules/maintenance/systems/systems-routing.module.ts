import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SystemsPage } from './systems.page';
import { AllMaintenanceSystemsComponent } from './all-maintenance-systems/all-maintenance-systems.component';
import { SystemMaintenanceHistoryComponent } from './system-maintenance-history/system-maintenance-history.component';
import { ViewMaintenanceSystemComponent } from './view-maintenance-system/view-maintenance-system.component';
import { NewMaintenanceSystemComponent } from './new-maintenance-system/new-maintenance-system.component';


const routes: Routes = [
  { 
    path: "", 
    component: SystemsPage,
    children: [
      { path: "", component: AllMaintenanceSystemsComponent },
      { path: "all-systems", component: AllMaintenanceSystemsComponent },
      { path: "add-system", component: NewMaintenanceSystemComponent },
      { path: "view-system", component: ViewMaintenanceSystemComponent },
      { path: "system-service-history", component: SystemMaintenanceHistoryComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemsRoutingModule { }
