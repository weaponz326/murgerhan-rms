import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncidentsRoutingModule } from './incidents-routing.module';
import { IncidentsPage } from './incidents.page';
import { AllIncidentsComponent } from './all-incidents/all-incidents.component';
import { NewIncidentsComponent } from './new-incidents/new-incidents.component';
import { ViewIncidentComponent } from './view-incident/view-incident.component';


@NgModule({
  declarations: [
    IncidentsPage,
    AllIncidentsComponent,
    NewIncidentsComponent,
    ViewIncidentComponent
  ],
  imports: [
    CommonModule,
    IncidentsRoutingModule
  ]
})
export class IncidentsModule { }
