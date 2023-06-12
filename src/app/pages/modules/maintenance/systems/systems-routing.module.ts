import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SystemsPage } from './systems.page';


const routes: Routes = [
  { path: "", component: SystemsPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemsRoutingModule { }
