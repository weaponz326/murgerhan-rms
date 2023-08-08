import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FactoryOrdersPage } from './factory-orders.page';
import { AllFactoryOrdersComponent } from './all-factory-orders/all-factory-orders.component';
import { ViewFactoryOrderComponent } from './view-factory-order/view-factory-order.component';
import { AllDailyFactoryOrdersComponent } from './all-daily-factory-orders/all-daily-factory-orders.component';
import { ViewDailyFactoryOrderComponent } from './view-daily-factory-order/view-daily-factory-order.component';

const routes: Routes = [
  { 
    path: "", 
    component: FactoryOrdersPage,
    children: [
      { path: "", component: AllDailyFactoryOrdersComponent },
      { path: "all-daily-factory-orders", component: AllDailyFactoryOrdersComponent },
      { path: "view-daily-factory-order", component: ViewDailyFactoryOrderComponent },
      { path: "all-factory-orders", component: AllFactoryOrdersComponent },
      { path: "view-branch-factory-order", component: ViewFactoryOrderComponent },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactoryOrdersRoutingModule { }
