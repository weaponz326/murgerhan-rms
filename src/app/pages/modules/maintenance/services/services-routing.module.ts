import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ServicesPage } from './services.page';
import { AllMaintenanceServicesComponent } from './all-maintenance-services/all-maintenance-services.component';
import { NewMaintenanceServiceComponent } from './new-maintenance-service/new-maintenance-service.component';
import { ViewMaintenanceServiceComponent } from './view-maintenance-service/view-maintenance-service.component';

import { viewServiceGuard } from 'src/app/guards/modules/maintenance/view-service/view-service.guard';


const routes: Routes = [
  { 
    path: "", 
    component: ServicesPage,
    children: [
      { path: "", component: AllMaintenanceServicesComponent },
      { path: "all-services", component: AllMaintenanceServicesComponent },
      { path: "new-service", component: NewMaintenanceServiceComponent },
      { path: "view-service", component: ViewMaintenanceServiceComponent, canActivate: [viewServiceGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
