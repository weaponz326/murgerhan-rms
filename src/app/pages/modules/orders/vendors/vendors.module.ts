import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { VendorsRoutingModule } from './vendors-routing.module';
import { ModuleUtilitiesModule } from 'src/app/components/module-utilities/module-utilities.module';

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
    ReactiveFormsModule,
    VendorsRoutingModule,
    ModuleUtilitiesModule
  ]
})
export class VendorsModule { }
