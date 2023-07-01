import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UnitsPage } from './units.page';
import { AllUnitsComponent } from './all-units/all-units.component';
import { AddUnitComponent } from './add-unit/add-unit.component';
import { EditUnitComponent } from './edit-unit/edit-unit.component';


const routes: Routes = [
  { 
    path: "", 
    component: UnitsPage,
    canActivateChild: [() => { return !!localStorage.getItem('uid'); }],
    children: [
      { path: "", component: AllUnitsComponent },
      { path: "all-units", component: AllUnitsComponent },
      { path: "add-unit", component: AddUnitComponent },
      { path: "edit-unit", component: EditUnitComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitsRoutingModule { }
