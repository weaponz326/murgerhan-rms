import { Component } from '@angular/core';
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
    private authApi: AuthApiService,
    private usersApi: UsersApiService,
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
            localStorage.setItem('uid', res.user.uid);
            this.initUserData();
          },
          (err: any) => {
            console.log(err);
            this.isSending = false;
            this.errorMessage = err.message.replace("Firebase:", "").replace(/\(.*\)/, "").trim().replace(/\.$/, "");
            this.errorCode = err.code;
            console.log(this.errorCode, this.errorMessage);
          }
        );
    }
    else{
      console.log("password mismatch");
      this.passwordMismatch = true;
    }

    console.log(this.signupForm.value);
  }

  initUserData(){
    // TODO:implement with cloud functions
    this.setBasicUser();
    this.setAdditionalUser();
    this.setAvailability();
  }

  setBasicUser() {    
    const id = localStorage.getItem('uid') as string;

    let data: UserBasicProfile = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      terms_acceptance_status: false,
      full_name: "",
      date_of_birth: "",
      ni_number: "",
      email: this.signupForm.controls.email.value as string,
      phone: "",
      address: "",
      profile_photo: "",
    }

    this.usersApi.setBasicUser(id, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  setAdditionalUser() {    
    const id = localStorage.getItem('uid') as string;

    let data: UserAdditionalProfile = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      nationality: "",
      religion: "",
      marital_status: "",
      e_contact_name: "",
      e_contact_number: "",
    }

    this.usersApi.setAdditionalUser(id, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setAvailability() {    
    const id = localStorage.getItem('uid') as string;

    let data: UserAvailabilty = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      contract_type: "",
      availability: {
        monday: { available: false, time_from: null, time_to: null },
        tuesday: { available: false, time_from: null, time_to: null },
        wednesday: { available: false, time_from: null, time_to: null },
        thursday: { available: false, time_from: null, time_to: null },
        friday: { available: false, time_from: null, time_to: null },
        saturday: { available: false, time_from: null, time_to: null },
        sunday: { available: false, time_from: null, time_to: null },
      }
    }

    this.usersApi.setAvailability(id, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

}
