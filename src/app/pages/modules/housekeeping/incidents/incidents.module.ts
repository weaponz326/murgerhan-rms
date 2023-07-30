import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IncidentsRoutingModule } from './incidents-routing.module';
import { ModuleUtilitiesModule } from 'src/app/components/module-utilities/module-utilities.module';
import { UsersWindowsModule } from 'src/app/components/select-windows/users-windows/users-windows.module';

import { IncidentsPage } from './incidents.page';
import { AllIncidentsComponent } from './all-incidents/all-incidents.component';
import { NewIncidentsComponent } from './new-incidents/new-incidents.component';
import { ViewIncidentComponent } from './view-incident/view-incident.component';
import { IncidentFormComponent } from './incident-form/incident-form.component';
import { IncidentDetailsComponent } from './incident-details/incident-details.component';


@NgModule({
  declarations: [
    IncidentsPage,
    AllIncidentsComponent,
    NewIncidentsComponent,
    ViewIncidentComponent,
    IncidentFormComponent,
    IncidentDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IncidentsRoutingModule,
    ModuleUtilitiesModule,
    UsersWindowsModule
  ]
})
export class IncidentsModule { }
