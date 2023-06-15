import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServicesPage } from './services.page';
import { AllMaintenanceServicesComponent } from './all-maintenance-services/all-maintenance-services.component';
import { NewMaintenanceServiceComponent } from './new-maintenance-service/new-maintenance-service.component';
import { ViewMaintenanceServiceComponent } from './view-maintenance-service/view-maintenance-service.component';
import { MaintenanceServiceFormComponent } from './maintenance-service-form/maintenance-service-form.component';


@NgModule({
  declarations: [
    ServicesPage,
    AllMaintenanceServicesComponent,
    NewMaintenanceServiceComponent,
    ViewMaintenanceServiceComponent,
    MaintenanceServiceFormComponent
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule
  ]
})
export class ServicesModule { }
