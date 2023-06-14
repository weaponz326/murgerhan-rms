import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersPage } from './users.page';
import { AllUsersComponent } from './all-users/all-users.component';
import { ViewUserComponent } from './view-user/view-user.component';


const routes: Routes = [
  { 
    path: "", 
    component: UsersPage,
    children: [
      { path: "", component: AllUsersComponent },
      { path: "all-users", component: AllUsersComponent },
      { path: "view-user", component: ViewUserComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
