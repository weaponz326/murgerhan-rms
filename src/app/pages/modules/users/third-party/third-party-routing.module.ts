import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ThirdPartyPage } from './third-party.page';
import { AllThirdPartiesComponent } from './all-third-parties/all-third-parties.component';
import { ViewThirdPartyComponent } from './view-third-party/view-third-party.component';

const routes: Routes = [
  { 
    path: "", 
    component: ThirdPartyPage,
    children: [
      { path: "", component: AllThirdPartiesComponent },
      { path: "all-third-parties", component: AllThirdPartiesComponent },
      { path: "view-third-party", component: ViewThirdPartyComponent },    // TODO: guard
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThirdPartyRoutingModule { }
