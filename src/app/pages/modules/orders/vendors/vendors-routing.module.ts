import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VendorsPage } from './vendors.page';
import { AllVendorsComponent } from './all-vendors/all-vendors.component';
import { NewVendorComponent } from './new-vendor/new-vendor.component';
import { ViewVendorComponent } from './view-vendor/view-vendor.component';
import { VendorHistoryComponent } from './vendor-history/vendor-history.component';
import { viewVendorGuard } from 'src/app/guards/modules/orders/view-vendor/view-vendor.guard';


const routes: Routes = [
  { 
    path: "", 
    component: VendorsPage,
    children: [
      { path: "", component: AllVendorsComponent },
      { path: "all-vendors", component: AllVendorsComponent },
      { path: "new-vendor", component: NewVendorComponent },
      { path: "view-vendor", component: ViewVendorComponent, canActivate: [viewVendorGuard] },
      { path: "vendor-history", component: VendorHistoryComponent, canActivate: [viewVendorGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorsRoutingModule { }
