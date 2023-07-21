import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactoryOrdersRoutingModule } from './factory-orders-routing.module';
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
    FactoryOrdersRoutingModule
  ]
})
export class FactoryOrdersModule { }
