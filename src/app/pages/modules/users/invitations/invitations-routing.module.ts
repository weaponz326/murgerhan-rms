import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InvitationsPage } from './invitations.page';
import { AllInvitationsComponent } from './all-invitations/all-invitations.component';
import { ViewInvitationComponent } from './view-invitation/view-invitation.component';


const routes: Routes = [
  { 
    path: "", 
    component: InvitationsPage,
    canActivateChild: [() => { return !!localStorage.getItem('uid'); }],
    children: [
      { path: "", component: AllInvitationsComponent },
      { path: "all-invitations", component: AllInvitationsComponent },
      { path: "view-invitation", component: ViewInvitationComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvitationsRoutingModule { }
