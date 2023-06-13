import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthPage } from './auth.page';
import { LoginFormComponent } from './login-form/login-form.component';
import { RecoveryFormComponent } from './recovery-form/recovery-form.component';
import { ResetFormComponent } from './reset-form/reset-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';


const routes: Routes = [
  { 
    path: "",
    component: AuthPage,
    children: [
      { path: "signup", component: SignupFormComponent },
      { path: "login", component: LoginFormComponent },
      { path: "reset", component: ResetFormComponent },
      { path: "recovery", component: RecoveryFormComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
