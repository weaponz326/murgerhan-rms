import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContractorsPage } from './contractors.page';


const routes: Routes = [
  { path: "", component: ContractorsPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractorsRoutingModule { }
