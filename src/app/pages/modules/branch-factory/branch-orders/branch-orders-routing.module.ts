import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BranchOrdersPage } from './branch-orders.page';
import { AllBranchOrdersComponent } from './all-branch-orders/all-branch-orders.component';
import { NewBranchOrderComponent } from './new-branch-order/new-branch-order.component';
import { ViewBranchOrderComponent } from './view-branch-order/view-branch-order.component';


const routes: Routes = [
  { 
    path: "", 
    component: BranchOrdersPage,
    children: [
      { path: "", component: AllBranchOrdersComponent },
      { path: "all-branch-orders", component: AllBranchOrdersComponent },
      { path: "new-branch-order", component: NewBranchOrderComponent },
      { path: "view-branch-order", component: ViewBranchOrderComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchOrdersRoutingModule { }
