import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchasingRoutingModule } from './purchasing-routing.module';
import { PurchasingPage } from './purchasing.page';
import { AllPurchasingComponent } from './all-purchasing/all-purchasing.component';
import { NewPurchasingComponent } from './new-purchasing/new-purchasing.component';
import { ViewPurchasingComponent } from './view-purchasing/view-purchasing.component';
import { PurchasingItemsComponent } from './purchasing-items/purchasing-items.component';
import { AddPurchasingItemComponent } from './add-purchasing-item/add-purchasing-item.component';
import { EditPurchasingItemComponent } from './edit-purchasing-item/edit-purchasing-item.component';
import { PurchasingQualityChecksComponent } from './purchasing-quality-checks/purchasing-quality-checks.component';
import { PurchasingItemFormComponent } from './purchasing-item-form/purchasing-item-form.component';


@NgModule({
  declarations: [
    PurchasingPage,
    AllPurchasingComponent,
    NewPurchasingComponent,
    ViewPurchasingComponent,
    PurchasingItemsComponent,
    AddPurchasingItemComponent,
    EditPurchasingItemComponent,
    PurchasingQualityChecksComponent,
    PurchasingItemFormComponent
  ],
  imports: [
    CommonModule,
    PurchasingRoutingModule
  ]
})
export class PurchasingModule { }
