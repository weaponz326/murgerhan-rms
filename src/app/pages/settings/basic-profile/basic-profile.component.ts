import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { UsersApiService } from 'src/app/services/modules-api/users-api/users-api.service';
import { UserBasicProfile } from 'src/app/models/modules/users/users.model';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-basic-profile',
  templateUrl: './basic-profile.component.html',
  styleUrls: ['./basic-profile.component.scss']
})
export class BasicProfileComponent {

  constructor(
    private router: Router,
    private usersApi: UsersApiService
  ) {}
  
  basicData: any;

  isFetchingData = false;
  isSavingBasic = false;

  basicForm = new FormGroup({
    fullName: new FormControl(''),
    dateOfBirth: new FormControl(),
    niNumber: new FormControl(''),
    email: new FormControl({value: '', disabled: true}),
    phone: new FormControl(''),
    address: new FormControl(''),
  })

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  
  ngOnInit(): void {
    this.getBasicUser();
  }

  getBasicUser() {
    this.isFetchingData = true;
    const id = localStorage.getItem('uid') as string;

    this.usersApi.getBasicUser(id)
      .then((res) => {
        // console.log(res);
        this.basicData = res;
        this.isFetchingData = false;
        this.setBasicData();        
      }),
      (err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  setBasicUser() {
    this.isSavingBasic = true;    
    
    let created_at: any;
    if (this.basicData.data()) created_at = this.basicData.data().created_at;
    else created_at = serverTimestamp();

    let profile_photo: any;
    if (this.basicData.data()) profile_photo = this.basicData.data().profile_photo;
    else profile_photo = null;

    let terms_acceptance_status: any;
    if (this.basicData.data()) terms_acceptance_status = this.basicData.data().terms_acceptance_status;
    else terms_acceptance_status = false;

    let terms_file: any;
    if (this.basicData.data()) terms_file = this.basicData.data().terms_file;
    else terms_file = false;

    const id = localStorage.getItem('uid') as string;

    let data: UserBasicProfile = {
      created_at: created_at,
      updated_at: serverTimestamp(),
      full_name: this.basicForm.controls.fullName.value as string,
      date_of_birth: this.basicForm.controls.dateOfBirth.value,
      ni_number: this.basicForm.controls.niNumber.value as string,
      email: this.basicForm.controls.email.value as string,
      phone: this.basicForm.controls.phone.value as string,
      address: this.basicForm.controls.address.value as string,
      profile_photo: profile_photo,
      terms_acceptance_status: terms_acceptance_status,
      terms_file: terms_file,
    }

    this.usersApi.setBasicUser(id, data)
      .then((res) => {
        // console.log(res);
        this.isSavingBasic = false;
        this.router.navigateByUrl('/settings/additional');
      })
      .catch((err) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isSavingBasic = false;
      });
  }

  setBasicData(){
    try{
      if (this.basicData.data()) this.basicForm.controls.email.setValue(this.basicData.data().email);
      else this.basicForm.controls.email.setValue(localStorage.getItem('email'));
      // console.log(localStorage.getItem('email'))
      
      this.basicForm.controls.fullName.setValue(this.basicData.data().full_name);
      this.basicForm.controls.dateOfBirth.setValue(this.basicData.data().date_of_birth);
      this.basicForm.controls.niNumber.setValue(this.basicData.data().ni_number);      
      this.basicForm.controls.phone.setValue(this.basicData.data().phone);
      this.basicForm.controls.address.setValue(this.basicData.data().address);      
    }
    catch{
      // console.log('first time here eh?...');
    }
  }

}
