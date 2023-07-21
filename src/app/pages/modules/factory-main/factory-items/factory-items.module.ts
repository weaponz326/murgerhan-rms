import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactoryItemsRoutingModule } from './factory-items-routing.module';
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
    FactoryItemsRoutingModule
  ]
})
export class FactoryItemsModule { }
