import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModuleUtilitiesModule } from '../../module-utilities/module-utilities.module';

import { SelectInvitationComponent } from './select-invitation/select-invitation.component';
import { SelectBasicUserComponent } from './select-basic-user/select-basic-user.component';
import { SelectUserRoleComponent } from './select-user-role/select-user-role.component';



@NgModule({
  declarations: [
    SelectInvitationComponent,
    SelectBasicUserComponent,
    SelectUserRoleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ModuleUtilitiesModule,
  ],
  exports: [
    SelectInvitationComponent,
    SelectBasicUserComponent,
    SelectUserRoleComponent
  ]
})
export class UsersWindowsModule { }
