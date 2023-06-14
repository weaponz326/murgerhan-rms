import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvitationsRoutingModule } from './invitations-routing.module';
import { InvitationsPage } from './invitations.page';
import { AllInvitationsComponent } from './all-invitations/all-invitations.component';
import { InviteUserComponent } from './invite-user/invite-user.component';
import { ViewInvitationComponent } from './view-invitation/view-invitation.component';


@NgModule({
  declarations: [
    InvitationsPage,
    AllInvitationsComponent,
    InviteUserComponent,
    ViewInvitationComponent
  ],
  imports: [
    CommonModule,
    InvitationsRoutingModule
  ]
})
export class InvitationsModule { }
