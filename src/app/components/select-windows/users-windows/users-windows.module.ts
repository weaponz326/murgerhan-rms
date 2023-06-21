import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from '../../module-utilities/module-utilities.module';

import { SelectUserComponent } from './select-user/select-user.component';
import { SelectInvitationComponent } from './select-invitation/select-invitation.component';



@NgModule({
  declarations: [
    SelectUserComponent,
    SelectInvitationComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ],
  exports: [
    SelectUserComponent,
    SelectInvitationComponent
  ]
})
export class UsersWindowsModule { }
