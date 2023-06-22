import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsPage } from './settings.page';
import { BasicProfileComponent } from './basic-profile/basic-profile.component';
import { AvailabilityComponent } from './availability/availability.component';
import { TermsComponent } from './terms/terms.component';
import { AdditionalInfoComponent } from './additional-info/additional-info.component';
import { ProfilePhotoComponent } from './profile-photo/profile-photo.component';


const routes: Routes = [
  {
    path: "",
    component: SettingsPage,
    children: [
      { path: "", component: BasicProfileComponent },
      { path: "basic", component: BasicProfileComponent },
      { path: "additional", component: AdditionalInfoComponent },
      { path: "photo", component: ProfilePhotoComponent },
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
