import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchasingRoutingModule } from './purchasing-routing.module';
import { PurchasingPage } from './purchasing.page';


@NgModule({
  declarations: [
    PurchasingPage
  ],
  imports: [
    CommonModule,
    PurchasingRoutingModule
  ]
})
export class PurchasingModule { }
