import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StockBatchesPage } from './stock-batches.page';


const routes: Routes = [
  { 
    path: "", 
    component: StockBatchesPage,
    children: [
      // { path: "", component: AllStockBatchesComponent },
      // { path: "all-stock-items", component: AllStockBatchesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockBatchesRoutingModule { }
