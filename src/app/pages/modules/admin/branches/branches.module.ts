import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BranchesRoutingModule } from './branches-routing.module';
import { ModuleUtilitiesModule } from 'src/app/components/module-utilities/module-utilities.module';
import { AdminWindowsModule } from 'src/app/components/select-windows/admin-windows/admin-windows.module';

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
    ReactiveFormsModule,
    FormsModule,
    BranchesRoutingModule,
    ModuleUtilitiesModule,
    AdminWindowsModule
  ]
})
export class BranchesModule { }
