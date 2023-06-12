import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchesRoutingModule } from './branches-routing.module';
import { BranchesPage } from './branches.page';


@NgModule({
  declarations: [
    BranchesPage
  ],
  imports: [
    CommonModule,
    BranchesRoutingModule
  ]
})
export class BranchesModule { }
