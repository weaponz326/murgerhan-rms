import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InvitationsRoutingModule } from './invitations-routing.module';
import { ModuleUtilitiesModule } from 'src/app/components/module-utilities/module-utilities.module';

import { InvitationsPage } from './invitations.page';
import { AllInvitationsComponent } from './all-invitations/all-invitations.component';
import { InviteUserComponent } from './invite-user/invite-user.component';
import { ViewInvitationComponent } from './view-invitation/view-invitation.component';
import { InvitationConfigurationComponent } from './invitation-configuration/invitation-configuration.component';


@NgModule({
  declarations: [
    InvitationsPage,
    AllInvitationsComponent,
    InviteUserComponent,
    ViewInvitationComponent,
    InvitationConfigurationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InvitationsRoutingModule,
    ModuleUtilitiesModule
  ]
})
export class InvitationsModule { }
