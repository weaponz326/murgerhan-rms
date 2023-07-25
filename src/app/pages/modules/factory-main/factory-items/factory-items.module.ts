import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FactoryItemsRoutingModule } from './factory-items-routing.module';
import { ModuleUtilitiesModule } from 'src/app/components/module-utilities/module-utilities.module';

import { FactoryItemsPage } from './factory-items.page';
import { AllFactoryItemsComponent } from './all-factory-items/all-factory-items.component';
import { AddFactoryItemComponent } from './add-factory-item/add-factory-item.component';
import { EditFactoryItemComponent } from './edit-factory-item/edit-factory-item.component';
import { FactoryItemFormComponent } from './factory-item-form/factory-item-form.component';


@NgModule({
  declarations: [
    FactoryItemsPage,
    AllFactoryItemsComponent,
    AddFactoryItemComponent,
    EditFactoryItemComponent,
    FactoryItemFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FactoryItemsRoutingModule,
    ModuleUtilitiesModule
  ]
})
export class FactoryItemsModule { }
