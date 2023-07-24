import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ItemsPage } from './items.page';
import { AllStockItemsComponent } from './all-stock-items/all-stock-items.component';
import { AddStockItemComponent } from './add-stock-item/add-stock-item.component';
import { EditStockItemComponent } from './edit-stock-item/edit-stock-item.component';


const routes: Routes = [
  { 
    path: "", 
    component: ItemsPage,
    children: [
      { path: "", component: AllStockItemsComponent },
      { path: "all-stock-items", component: AllStockItemsComponent },
      { path: "new-stock-item", component: AddStockItemComponent },
      { path: "view-stock-item", component: EditStockItemComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }
