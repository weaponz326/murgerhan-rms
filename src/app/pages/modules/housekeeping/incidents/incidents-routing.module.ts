import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IncidentsPage } from './incidents.page';
import { AllIncidentsComponent } from './all-incidents/all-incidents.component';
import { NewIncidentsComponent } from './new-incidents/new-incidents.component';
import { ViewIncidentComponent } from './view-incident/view-incident.component';

import { viewIncidentGuard } from 'src/app/guards/modules/housekeeping/view-incident/view-incident.guard';


const routes: Routes = [
  { 
    path: "", 
    component: IncidentsPage, 
    children: [
      { path: "", component: AllIncidentsComponent },
      { path: "all-incidents", component: AllIncidentsComponent },
      { path: "new-incident", component: NewIncidentsComponent },
      { path: "view-incident", component: ViewIncidentComponent, canActivate: [viewIncidentGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidentsRoutingModule { }
