import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ItemsPage } from './items.page';
import { AllStockItemsComponent } from './all-stock-items/all-stock-items.component';


const routes: Routes = [
  { 
    path: "", 
    component: ItemsPage,
    children: [
      { path: "", component: AllStockItemsComponent },
      { path: "all-stock-items", component: AllStockItemsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }
