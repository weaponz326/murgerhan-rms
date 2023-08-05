import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ThirdPartyRoutingModule } from './third-party-routing.module';
import { ModuleUtilitiesModule } from 'src/app/components/module-utilities/module-utilities.module';

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
  ]
})
export class ThirdPartyModule { }
