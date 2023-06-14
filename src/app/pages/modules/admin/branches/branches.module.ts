import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchesRoutingModule } from './branches-routing.module';
import { BranchesPage } from './branches.page';
import { AllBranchesComponent } from './all-branches/all-branches.component';
import { NewBranchComponent } from './new-branch/new-branch.component';
import { EditBranchComponent } from './edit-branch/edit-branch.component';


@NgModule({
  declarations: [
    BranchesPage,
    AllBranchesComponent,
    NewBranchComponent,
    EditBranchComponent,
  ],
  imports: [
    CommonModule,
    BranchesRoutingModule
  ]
})
export class BranchesModule { }