import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockBatchesRoutingModule } from './stock-batches-routing.module';
import { StockBatchesPage } from './stock-batches.page';
import { AllBatchesComponent } from './all-batches/all-batches.component';
import { AddBatchComponent } from './add-batch/add-batch.component';
import { EditBatchComponent } from './edit-batch/edit-batch.component';
import { BatchFormComponent } from './batch-form/batch-form.component';


@NgModule({
  declarations: [
    StockBatchesPage,
    AllBatchesComponent,
    AddBatchComponent,
    EditBatchComponent,
    BatchFormComponent
  ],
  imports: [
    CommonModule,
    StockBatchesRoutingModule
  ]
})
export class StockBatchesModule { }
