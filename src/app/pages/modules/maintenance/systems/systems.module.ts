import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SystemsRoutingModule } from './systems-routing.module';
import { ModuleUtilitiesModule } from 'src/app/components/module-utilities/module-utilities.module';

import { SystemsPage } from './systems.page';
import { AllMaintenanceSystemsComponent } from './all-maintenance-systems/all-maintenance-systems.component';
import { NewMaintenanceSystemComponent } from './new-maintenance-system/new-maintenance-system.component';
import { ViewMaintenanceSystemComponent } from './view-maintenance-system/view-maintenance-system.component';
import { MaintenanceSystemFormComponent } from './maintenance-system-form/maintenance-system-form.component';
import { SystemMaintenanceHistoryComponent } from './system-maintenance-history/system-maintenance-history.component';
import { SystemIssuesHistoryComponent } from './system-issues-history/system-issues-history.component';


@NgModule({
  declarations: [
    SystemsPage,
    AllMaintenanceSystemsComponent,
    NewMaintenanceSystemComponent,
    ViewMaintenanceSystemComponent,
    MaintenanceSystemFormComponent,
    SystemMaintenanceHistoryComponent,
    SystemIssuesHistoryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SystemsRoutingModule,
    ModuleUtilitiesModule
  ]
})
export class SystemsModule { }
