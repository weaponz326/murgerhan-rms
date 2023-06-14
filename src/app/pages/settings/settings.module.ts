import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
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
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
