import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthApiService } from 'src/app/services/auth-api/auth-api.service';


@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent {

  constructor(
    private authApi: AuthApiService,
  ) { }

  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password1: new FormControl('', Validators.required),
    password2: new FormControl('', Validators.required),
  })

  errorCode = "";
  errorMessage = "";
  passwordMismatch = false;

  saved: boolean = false;
  isSending: boolean = false;
  showPrompt: boolean = false;

  onSubmit(){
    this.saved = true;

    let email = this.signupForm.controls.email.value as string
    let password1 = this.signupForm.controls.password1.value as string
    let password2 = this.signupForm.controls.password2.value as string

    if (this.signupForm.valid && password1 == password2){
      this.isSending = true;

      this.authApi.signup(email, password1)
        .then(
          (res: any) => {
            console.log(res);
            this.isSending = false;
            this.showPrompt = true;
            // user = res.user.uid;
          },
          (err: any) => {
            console.log(err);
            this.isSending = false;
            this.errorMessage = err.message.replace("Firebase:", "").replace(/\(.*\)/, "").trim().replace(/\.$/, "");
            this.errorCode = err.code;
            console.log(this.errorCode, this.errorMessage)
          }
        );
    }
    else{
      console.log("password mismatch");
      this.passwordMismatch = true;
    }

    console.log(this.signupForm.value);
  }
  
}
