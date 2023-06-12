import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UnitsPage } from './units.page';


const routes: Routes = [
  { path: "", component: UnitsPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitsRoutingModule { }
