import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorsRoutingModule } from './vendors-routing.module';
import { VendorsPage } from './vendors.page';
import { AllVendorsComponent } from './all-vendors/all-vendors.component';
import { NewVendorComponent } from './new-vendor/new-vendor.component';
import { ViewVendorComponent } from './view-vendor/view-vendor.component';
import { VendorFormComponent } from './vendor-form/vendor-form.component';
import { VendorHistoryComponent } from './vendor-history/vendor-history.component';
import { VendorProductsComponent } from './vendor-products/vendor-products.component';


@NgModule({
  declarations: [
    VendorsPage,
    AllVendorsComponent,
    NewVendorComponent,
    ViewVendorComponent,
    VendorFormComponent,
    VendorHistoryComponent,
    VendorProductsComponent
  ],
  imports: [
    CommonModule,
    VendorsRoutingModule
  ]
})
export class VendorsModule { }
