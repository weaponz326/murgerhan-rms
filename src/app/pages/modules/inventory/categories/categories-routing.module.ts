import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesPage } from './categories.page';
import { AllItemCategoriesComponent } from './all-item-categories/all-item-categories.component';
import { AddItemCategoryComponent } from './add-item-category/add-item-category.component';
import { EditItemCategoryComponent } from './edit-item-category/edit-item-category.component';


const routes: Routes = [
  { 
    path: "", 
    component: CategoriesPage,
    canActivateChild: [() => { return !!localStorage.getItem('uid'); }],
    children: [
      { path: "", component: AllItemCategoriesComponent },
      { path: "all-item-categories", component: AllItemCategoriesComponent },
      { path: "add-item-category", component: AddItemCategoryComponent },
      { path: "edit-item-category", component: EditItemCategoryComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
