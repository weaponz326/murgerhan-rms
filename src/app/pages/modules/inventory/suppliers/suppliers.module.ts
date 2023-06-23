import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SuppliersRoutingModule } from './suppliers-routing.module';
import { ModuleUtilitiesModule } from 'src/app/components/module-utilities/module-utilities.module';
import { InventoryWindowsModule } from 'src/app/components/select-windows/inventory-windows/inventory-windows.module';

import { SuppliersPage } from './suppliers.page';
import { AllSuppliersComponent } from './all-suppliers/all-suppliers.component';
import { NewSupplierComponent } from './new-supplier/new-supplier.component';
import { ViewSupplierComponent } from './view-supplier/view-supplier.component';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';
import { SupplierProductsComponent } from './supplier-products/supplier-products.component';
import { SupplierHistoryComponent } from './supplier-history/supplier-history.component';


@NgModule({
  declarations: [
    SuppliersPage,
    AllSuppliersComponent,
    NewSupplierComponent,
    ViewSupplierComponent,
    SupplierFormComponent,
    SupplierProductsComponent,
    SupplierHistoryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SuppliersRoutingModule,
    ModuleUtilitiesModule,
    InventoryWindowsModule
  ]
})
export class SuppliersModule { }
