import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FactoryOrdersRoutingModule } from './factory-orders-routing.module';
import { ModuleUtilitiesModule } from 'src/app/components/module-utilities/module-utilities.module';

import { FactoryOrdersPage } from './factory-orders.page';
import { AllFactoryOrdersComponent } from './all-factory-orders/all-factory-orders.component';
import { ViewFactoryOrderComponent } from './view-factory-order/view-factory-order.component';


@NgModule({
  declarations: [
    FactoryOrdersPage,
    AllFactoryOrdersComponent,
    ViewFactoryOrderComponent
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
