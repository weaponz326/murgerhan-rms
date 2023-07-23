import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FactoryOrdersPage } from './factory-orders.page';
import { AllFactoryOrdersComponent } from './all-factory-orders/all-factory-orders.component';
import { ViewFactoryOrderComponent } from './view-factory-order/view-factory-order.component';

const routes: Routes = [
  { 
    path: "", 
    component: FactoryOrdersPage,
    children: [
      { path: "", component: AllFactoryOrdersComponent },
      { path: "all-factory-orders", component: AllFactoryOrdersComponent },
      { path: "view-factory-order", component: ViewFactoryOrderComponent },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactoryOrdersRoutingModule { }
