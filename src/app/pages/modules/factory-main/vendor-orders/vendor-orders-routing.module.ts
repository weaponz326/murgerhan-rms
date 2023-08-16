import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorOrdersPage } from './vendor-orders.page';
import { AllVendorOrdersComponent } from './all-vendor-orders/all-vendor-orders.component';
import { ViewVendorOrderComponent } from './view-vendor-order/view-vendor-order.component';

const routes: Routes = [
  { 
    path: "", 
    component: VendorOrdersPage,
    children: [
      { path: "", component: AllVendorOrdersComponent },
      { path: "all-factory-vendor-orders", component: AllVendorOrdersComponent },
      { path: "view-factory-vendor-order", component: ViewVendorOrderComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorOrdersRoutingModule { }
