import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractorsRoutingModule } from './contractors-routing.module';
import { ContractorsPage } from './contractors.page';


@NgModule({
  declarations: [
    ContractorsPage
  ],
  imports: [
    CommonModule,
    ContractorsRoutingModule
  ]
})
export class ContractorsModule { }
