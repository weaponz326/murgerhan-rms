import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BranchOrdersRoutingModule } from './branch-orders-routing.module';
import { ModuleUtilitiesModule } from 'src/app/components/module-utilities/module-utilities.module';

import { BranchOrdersPage } from './branch-orders.page';
import { AllBranchOrdersComponent } from './all-branch-orders/all-branch-orders.component';
import { NewBranchOrderComponent } from './new-branch-order/new-branch-order.component';
import { ViewBranchOrderComponent } from './view-branch-order/view-branch-order.component';
import { BranchOrderItemsComponent } from './branch-order-items/branch-order-items.component';
import { AddBranchOrderItemComponent } from './add-branch-order-item/add-branch-order-item.component';
import { EditBranchOrderItemComponent } from './edit-branch-order-item/edit-branch-order-item.component';
import { BranchOrderItemFormComponent } from './branch-order-item-form/branch-order-item-form.component';


@NgModule({
  declarations: [
    BranchOrdersPage,
    AllBranchOrdersComponent,
    NewBranchOrderComponent,
    ViewBranchOrderComponent,
    BranchOrderItemsComponent,
    AddBranchOrderItemComponent,
    EditBranchOrderItemComponent,
    BranchOrderItemFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BranchOrdersRoutingModule,
    ModuleUtilitiesModule
  ]
})
export class BranchOrdersModule { }
