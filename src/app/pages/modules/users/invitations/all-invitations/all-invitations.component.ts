import { Component, ViewChild } from '@angular/core';
import { InviteUserComponent } from '../invite-user/invite-user.component';

@Component({
  selector: 'app-all-invitations',
  templateUrl: './all-invitations.component.html',
  styleUrls: ['./all-invitations.component.scss']
})
export class AllInvitationsComponent {

  @ViewChild('inviteUserComponentReference', { read: InviteUserComponent, static: false }) inviteUser!: InviteUserComponent;

}
