import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MonthlyOrdersPage } from './monthly-orders.page';
import { AllMonthlyOrdersComponent } from './all-monthly-orders/all-monthly-orders.component';
import { ViewMonthlyOrderComponent } from './view-monthly-order/view-monthly-order.component';

const routes: Routes = [
  { 
    path: "", 
    component: MonthlyOrdersPage,
    children: [
      { path: "", component: AllMonthlyOrdersComponent },
      { path: "all-monthly-orders", component: AllMonthlyOrdersComponent },
      { path: "view-monthly-order", component: ViewMonthlyOrderComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonthlyOrdersRoutingModule { }
