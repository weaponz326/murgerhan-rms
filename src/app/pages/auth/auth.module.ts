import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RecoveryFormComponent } from './recovery-form/recovery-form.component';
import { ResetFormComponent } from './reset-form/reset-form.component';
import { FormHeaderComponent } from './form-header/form-header.component';


@NgModule({
  declarations: [
    SignupFormComponent,
    LoginFormComponent,
    RecoveryFormComponent,
    ResetFormComponent,
    FormHeaderComponent,
    AuthPage
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
