import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersPage } from './users.page';
import { AllUsersComponent } from './all-users/all-users.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserRoleComponent } from './user-role/user-role.component';


@NgModule({
  declarations: [
    UsersPage,
    AllUsersComponent,
    ViewUserComponent,
    UserProfileComponent,
    UserRoleComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
