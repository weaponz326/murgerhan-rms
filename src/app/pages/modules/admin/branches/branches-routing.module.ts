import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BranchesPage } from './branches.page';
import { AllBranchesComponent } from './all-branches/all-branches.component';
import { NewBranchComponent } from './new-branch/new-branch.component';
import { EditBranchComponent } from './edit-branch/edit-branch.component';


const routes: Routes = [
  { 
    path: "", 
    component: BranchesPage,
    canActivateChild: [() => { return !!localStorage.getItem('uid'); }],
    children: [
      { path: "", component: AllBranchesComponent },
      { path: "all-branches", component: AllBranchesComponent },
      { path: "new-branch", component: NewBranchComponent },
      { path: "edit-branch", component: EditBranchComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchesRoutingModule { }
