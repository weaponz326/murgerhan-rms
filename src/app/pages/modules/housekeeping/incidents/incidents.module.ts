import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncidentsRoutingModule } from './incidents-routing.module';
import { IncidentsPage } from './incidents.page';


@NgModule({
  declarations: [
    IncidentsPage
  ],
  imports: [
    CommonModule,
    IncidentsRoutingModule
  ]
})
export class IncidentsModule { }
