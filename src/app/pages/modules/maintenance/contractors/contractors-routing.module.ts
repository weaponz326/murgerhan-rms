import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContractorsPage } from './contractors.page';
import { AllContractorsComponent } from './all-contractors/all-contractors.component';
import { AddContractorsComponent } from './add-contractors/add-contractors.component';
import { EditContractorsComponent } from './edit-contractors/edit-contractors.component';
import { ContractorHistoryComponent } from './contractor-history/contractor-history.component';


const routes: Routes = [
  { 
    path: "", 
    component: ContractorsPage,
    children: [
      { path: "", component: AllContractorsComponent },
      { path: "all-contractors", component: AllContractorsComponent },
      { path: "add-contractor", component: AddContractorsComponent },
      { path: "edit-contractor", component: EditContractorsComponent },
      { path: "contractor-history", component: ContractorHistoryComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractorsRoutingModule { }
