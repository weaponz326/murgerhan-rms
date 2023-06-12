import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvitationsRoutingModule } from './invitations-routing.module';
import { InvitationsPage } from './invitations.page';


@NgModule({
  declarations: [
    InvitationsPage
  ],
  imports: [
    CommonModule,
    InvitationsRoutingModule
  ]
})
export class InvitationsModule { }
