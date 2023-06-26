import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CategoriesRoutingModule } from './categories-routing.module';
import { ModuleUtilitiesModule } from 'src/app/components/module-utilities/module-utilities.module';

import { CategoriesPage } from './categories.page';
import { AllItemCategoriesComponent } from './all-item-categories/all-item-categories.component';
import { AddItemCategoryComponent } from './add-item-category/add-item-category.component';
import { EditItemCategoryComponent } from './edit-item-category/edit-item-category.component';
import { ItemCategoryFormComponent } from './item-category-form/item-category-form.component';
import { CategoryQualityChecklistComponent } from './category-quality-checklist/category-quality-checklist.component';
import { AddChecklistComponent } from './add-checklist/add-checklist.component';
import { EditChecklistComponent } from './edit-checklist/edit-checklist.component';


@NgModule({
  declarations: [
    CategoriesPage,
    AllItemCategoriesComponent,
    AddItemCategoryComponent,
    EditItemCategoryComponent,
    ItemCategoryFormComponent,
    CategoryQualityChecklistComponent,
    AddChecklistComponent,
    EditChecklistComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CategoriesRoutingModule,
    ModuleUtilitiesModule,
  ]
})
export class CategoriesModule { }
