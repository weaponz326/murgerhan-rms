import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MonthlyOrdersRoutingModule } from './monthly-orders-routing.module';
import { ModuleUtilitiesModule } from 'src/app/components/module-utilities/module-utilities.module';

import { MonthlyOrdersPage } from './monthly-orders.page';
import { AllMonthlyOrdersComponent } from './all-monthly-orders/all-monthly-orders.component';
import { ViewMonthlyOrderComponent } from './view-monthly-order/view-monthly-order.component';


@NgModule({
  declarations: [
    MonthlyOrdersPage,
    AllMonthlyOrdersComponent,
    ViewMonthlyOrderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MonthlyOrdersRoutingModule,
    ModuleUtilitiesModule
  ]
})
export class MonthlyOrdersModule { }
