import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RosterPage } from './roster.page';
import { AllRosterComponent } from './all-roster/all-roster.component';
import { ViewRosterComponent } from './view-roster/view-roster.component';
import { ManageBatchesComponent } from './manage-batches/manage-batches.component';

import { viewRosterGuard } from 'src/app/guards/modules/attendance/view-roster/view-roster.guard';


const routes: Routes = [
  { 
    path: "", 
    component: RosterPage,
    children: [
      { path: "", component: AllRosterComponent },
      { path: "all-roster", component: AllRosterComponent },
      { path: "view-roster", component: ViewRosterComponent, canActivate: [viewRosterGuard] },
      { path: "manage-batches", component: ManageBatchesComponent, canActivate: [viewRosterGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RosterRoutingModule { }
