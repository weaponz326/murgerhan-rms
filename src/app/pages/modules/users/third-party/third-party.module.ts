import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ThirdPartyRoutingModule } from './third-party-routing.module';
import { ModuleUtilitiesModule } from 'src/app/components/module-utilities/module-utilities.module';
import { OrdersWindowsModule } from 'src/app/components/select-windows/orders-windows/orders-windows.module';
import { InventoryWindowsModule } from 'src/app/components/select-windows/inventory-windows/inventory-windows.module';

import { ThirdPartyPage } from './third-party.page';
import { AllThirdPartiesComponent } from './all-third-parties/all-third-parties.component';
import { ViewThirdPartyComponent } from './view-third-party/view-third-party.component';


@NgModule({
  declarations: [
    ThirdPartyPage,
    AllThirdPartiesComponent,
    ViewThirdPartyComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ThirdPartyRoutingModule,
    ModuleUtilitiesModule,
    OrdersWindowsModule,
    InventoryWindowsModule
  ]
})
export class ThirdPartyModule { }
