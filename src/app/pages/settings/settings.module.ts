import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SettingsRoutingModule } from './settings-routing.module';
import { ModuleUtilitiesModule } from 'src/app/components/module-utilities/module-utilities.module';

import { SettingsPage } from './settings.page';
import { BasicProfileComponent } from './basic-profile/basic-profile.component';
import { AvailabilityComponent } from './availability/availability.component';
import { TermsComponent } from './terms/terms.component';
import { AdditionalInfoComponent } from './additional-info/additional-info.component';


@NgModule({
  declarations: [
    SettingsPage,
    BasicProfileComponent,
    AvailabilityComponent,
    TermsComponent,
    AdditionalInfoComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ModuleUtilitiesModule,
  ]
})
export class SettingsModule { }
