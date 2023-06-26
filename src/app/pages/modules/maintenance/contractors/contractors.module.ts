import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContractorsRoutingModule } from './contractors-routing.module';
import { ModuleUtilitiesModule } from 'src/app/components/module-utilities/module-utilities.module';

import { ContractorsPage } from './contractors.page';
import { AllContractorsComponent } from './all-contractors/all-contractors.component';
import { AddContractorsComponent } from './add-contractors/add-contractors.component';
import { EditContractorsComponent } from './edit-contractors/edit-contractors.component';
import { ContractorFormComponent } from './contractor-form/contractor-form.component';
import { ContractorHistoryComponent } from './contractor-history/contractor-history.component';


@NgModule({
  declarations: [
    ContractorsPage,
    AllContractorsComponent,
    AddContractorsComponent,
    EditContractorsComponent,
    ContractorFormComponent,
    ContractorHistoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContractorsRoutingModule,
    ModuleUtilitiesModule
  ]
})
export class ContractorsModule { }
