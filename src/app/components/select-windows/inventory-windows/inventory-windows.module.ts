import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from '../../module-utilities/module-utilities.module';

import { SelectItemCategoryComponent } from './select-item-category/select-item-category.component';
import { SelectPurchasingComponent } from './select-purchasing/select-purchasing.component';
import { SelectStockItemComponent } from './select-stock-item/select-stock-item.component';
import { SelectSupplierComponent } from './select-supplier/select-supplier.component';


@NgModule({
  declarations: [
    SelectItemCategoryComponent,
    SelectPurchasingComponent,
    SelectStockItemComponent,
    SelectSupplierComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ],
  exports: [
    SelectItemCategoryComponent,
    SelectPurchasingComponent,
    SelectStockItemComponent,
    SelectSupplierComponent
  ]
})
export class InventoryWindowsModule { }
