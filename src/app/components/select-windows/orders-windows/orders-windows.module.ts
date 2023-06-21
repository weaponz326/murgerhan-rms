import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from '../../module-utilities/module-utilities.module';

import { SelectProductComponent } from './select-product/select-product.component';
import { SelectOrderComponent } from './select-order/select-order.component';
import { SelectVendorComponent } from './select-vendor/select-vendor.component';



@NgModule({
  declarations: [
    SelectProductComponent,
    SelectOrderComponent,
    SelectVendorComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ],
  exports: [
    SelectProductComponent,
    SelectOrderComponent,
    SelectVendorComponent
  ]
})
export class OrdersWindowsModule { }
