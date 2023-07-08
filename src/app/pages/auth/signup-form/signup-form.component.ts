import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { serverTimestamp } from 'firebase/firestore';
import { UserAdditionalProfile, UserAvailabilty, UserBasicProfile } from 'src/app/models/modules/users/users.model';

import { AuthApiService } from 'src/app/services/auth-api/auth-api.service';
import { UsersApiService } from 'src/app/services/modules-api/users-api/users-api.service';


@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent {

  constructor(
    private route: ActivatedRoute,
    private authApi: AuthApiService,
    private usersApi: UsersApiService,
  ) { }

  signupForm = new FormGroup({
    email: new FormControl({value: '', disabled: true}, [Validators.required, Validators.email]),
    password1: new FormControl('', Validators.required),
    password2: new FormControl('', Validators.required),
  })

  errorCode = "";
  errorMessage = "";
  passwordMismatch = false;

  saved: boolean = false;
  isLoading: boolean = true;
  isSending: boolean = false;
  showPrompt: boolean = false;

  invitationId = "";

  ngOnInit(): void {
    this.getParams();
  }

  getParams() {
    this.route.queryParams.subscribe(params => {
      // console.log(params);
      this.invitationId = params['id'];
      this.getInvitation();
    })
  }

  getInvitation() {
    this.usersApi.getInvitation(this.invitationId)
      .then((res) => {
        // console.log(res);

        let invitationData: any = res;
        if(invitationData.data().invitation_status == 'Awaiting'){
          this.signupForm.controls.email.setValue(invitationData.data().invitee_email);
          this.isLoading = false;
        }
      }),
      (err: any) => {
        // console.log(err);
      };
  }

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
            // console.log(res);
            this.isSending = false;
            this.showPrompt = true;
            localStorage.setItem('uid', res.user.uid);
          },
          (err: any) => {
            // console.log(err);
            this.isSending = false;
            this.errorMessage = err.message.replace("Firebase:", "").replace(/\(.*\)/, "").trim().replace(/\.$/, "");
            this.errorCode = err.code;
            // console.log(this.errorCode, this.errorMessage);
          }
        );
    }
    else{
      // console.log("password mismatch");
      this.passwordMismatch = true;
    }

    // console.log(this.signupForm.value);
  }

}
