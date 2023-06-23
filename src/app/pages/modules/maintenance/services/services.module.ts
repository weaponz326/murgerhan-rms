import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ServicesRoutingModule } from './services-routing.module';
import { ModuleUtilitiesModule } from 'src/app/components/module-utilities/module-utilities.module';
import { MaintenanceWindowsModule } from 'src/app/components/select-windows/maintenance-windows/maintenance-windows.module';

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
    ReactiveFormsModule,
    ServicesRoutingModule,
    ModuleUtilitiesModule,
    MaintenanceWindowsModule
  ]
})
export class ServicesModule { }
