import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StockBatchesRoutingModule } from './stock-batches-routing.module';
import { ModuleUtilitiesModule } from 'src/app/components/module-utilities/module-utilities.module';
import { InventoryWindowsModule } from 'src/app/components/select-windows/inventory-windows/inventory-windows.module';

import { StockBatchesPage } from './stock-batches.page';
import { AllStockBatchesComponent } from './all-stock-batches/all-stock-batches.component';
import { AddStockBatchComponent } from './add-stock-batch/add-stock-batch.component';
import { EditStockBatchComponent } from './edit-stock-batch/edit-stock-batch.component';
import { StockBatchFormComponent } from './stock-batch-form/stock-batch-form.component';


@NgModule({
  declarations: [
    StockBatchesPage,
    AllStockBatchesComponent,
    AddStockBatchComponent,
    EditStockBatchComponent,
    StockBatchFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    StockBatchesRoutingModule,
    ModuleUtilitiesModule,
    InventoryWindowsModule
  ]
})
export class StockBatchesModule { }
