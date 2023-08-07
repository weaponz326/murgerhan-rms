import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FactoryOrdersRoutingModule } from './factory-orders-routing.module';
import { ModuleUtilitiesModule } from 'src/app/components/module-utilities/module-utilities.module';

import { FactoryOrdersPage } from './factory-orders.page';
import { AllFactoryOrdersComponent } from './all-factory-orders/all-factory-orders.component';
import { ViewFactoryOrderComponent } from './view-factory-order/view-factory-order.component';
import { AllDailyFactoryOrdersComponent } from './all-daily-factory-orders/all-daily-factory-orders.component';
import { ViewDailyFactoryOrderComponent } from './view-daily-factory-order/view-daily-factory-order.component';


@NgModule({
  declarations: [
    FactoryOrdersPage,
    AllFactoryOrdersComponent,
    ViewFactoryOrderComponent,
    AllDailyFactoryOrdersComponent,
    ViewDailyFactoryOrderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FactoryOrdersRoutingModule,
    ModuleUtilitiesModule
  ]
})
export class FactoryOrdersModule { }
