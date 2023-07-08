import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersPage } from './users.page';
import { AllUsersComponent } from './all-users/all-users.component';
import { ViewUserComponent } from './view-user/view-user.component';

import { viewUserGuard } from 'src/app/guards/modules/users/view-user/view-user.guard';


const routes: Routes = [
  { 
    path: "", 
    component: UsersPage,
    children: [
      { path: "", component: AllUsersComponent },
      { path: "all-users", component: AllUsersComponent },
      { path: "view-user", component: ViewUserComponent, canActivate: [viewUserGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
