import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsPage } from './settings.page';
import { BasicProfileComponent } from './basic-profile/basic-profile.component';
import { AdditionalProfileComponent } from './additional-profile/additional-profile.component';
import { AvailabilityComponent } from './availability/availability.component';
import { TermsComponent } from './terms/terms.component';


const routes: Routes = [
  {
    path: "",
    component: SettingsPage,
    children: [
      { path: "basic", component: BasicProfileComponent },
      { path: "additional", component: AdditionalProfileComponent },
      { path: "availability", component: AvailabilityComponent },
      { path: "terms", component: TermsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
