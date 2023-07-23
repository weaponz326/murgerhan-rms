import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FactoryItemsPage } from './factory-items.page';
import { AllFactoryItemsComponent } from './all-factory-items/all-factory-items.component';
import { AddFactoryItemComponent } from './add-factory-item/add-factory-item.component';
import { EditFactoryItemComponent } from './edit-factory-item/edit-factory-item.component';


const routes: Routes = [
  { 
    path: "", 
    component: FactoryItemsPage,
    children: [
      { path: "", component: AllFactoryItemsComponent },
      { path: "all-factory-items", component: AllFactoryItemsComponent },
      { path: "add-factory-item", component: AddFactoryItemComponent },
      { path: "edit-factory-item", component: EditFactoryItemComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactoryItemsRoutingModule { }
