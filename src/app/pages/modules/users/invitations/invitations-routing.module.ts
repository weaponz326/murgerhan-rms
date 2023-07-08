import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InvitationsPage } from './invitations.page';
import { AllInvitationsComponent } from './all-invitations/all-invitations.component';
import { ViewInvitationComponent } from './view-invitation/view-invitation.component';

import { viewInvitationGuard } from 'src/app/guards/modules/users/view-invitaion/view-invitation.guard';


const routes: Routes = [
  { 
    path: "", 
    component: InvitationsPage,
    children: [
      { path: "", component: AllInvitationsComponent },
      { path: "all-invitations", component: AllInvitationsComponent },
      { path: "view-invitation", component: ViewInvitationComponent, canActivate: [viewInvitationGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvitationsRoutingModule { }
