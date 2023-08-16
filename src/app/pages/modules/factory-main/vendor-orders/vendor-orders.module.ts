import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { VendorOrdersRoutingModule } from './vendor-orders-routing.module';
import { ModuleUtilitiesModule } from 'src/app/components/module-utilities/module-utilities.module';

import { VendorOrdersPage } from './vendor-orders.page';
import { AllVendorOrdersComponent } from './all-vendor-orders/all-vendor-orders.component';
import { ViewVendorOrderComponent } from './view-vendor-order/view-vendor-order.component';
import { VendorOrderItemsComponent } from './vendor-order-items/vendor-order-items.component';


@NgModule({
  declarations: [
    VendorOrdersPage,
    AllVendorOrdersComponent,
    ViewVendorOrderComponent,
    VendorOrderItemsComponent
  ],
  imports: [
    CommonModule,
    VendorOrdersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ModuleUtilitiesModule
  ]
})
export class VendorOrdersModule { }
