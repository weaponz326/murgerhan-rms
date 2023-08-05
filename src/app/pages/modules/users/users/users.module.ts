import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { ModuleUtilitiesModule } from 'src/app/components/module-utilities/module-utilities.module';
import { AdminWindowsModule } from 'src/app/components/select-windows/admin-windows/admin-windows.module';

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
    ReactiveFormsModule,
    FormsModule,
    UsersRoutingModule,
    ModuleUtilitiesModule,
    AdminWindowsModule
  ]
})
export class UsersModule { }
