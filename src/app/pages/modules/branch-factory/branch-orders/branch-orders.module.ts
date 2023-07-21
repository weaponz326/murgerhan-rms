import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchOrdersRoutingModule } from './branch-orders-routing.module';
import { BranchOrdersPage } from './branch-orders.page';
import { AllBranchOrdersComponent } from './all-branch-orders/all-branch-orders.component';
import { NewBranchOrderComponent } from './new-branch-order/new-branch-order.component';
import { ViewBranchOrderComponent } from './view-branch-order/view-branch-order.component';
import { BranchOrderItemsComponent } from './branch-order-items/branch-order-items.component';
import { AddBranchOrderItemComponent } from './add-branch-order-item/add-branch-order-item.component';
import { EditBranchOrderItemComponent } from './edit-branch-order-item/edit-branch-order-item.component';


@NgModule({
  declarations: [
    BranchOrdersPage,
    AllBranchOrdersComponent,
    NewBranchOrderComponent,
    ViewBranchOrderComponent,
    BranchOrderItemsComponent,
    AddBranchOrderItemComponent,
    EditBranchOrderItemComponent
  ],
  imports: [
    CommonModule,
    BranchOrdersRoutingModule
  ]
})
export class BranchOrdersModule { }
