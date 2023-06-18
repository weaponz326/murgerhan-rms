import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { UsersApiService } from 'src/app/services/modules-api/users-api/users-api.service';
import { UserAdditionalProfile } from 'src/app/models/modules/users/users.model';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.scss']
})
export class AdditionalInfoComponent {

  constructor(
    private router: Router,
    private usersApi: UsersApiService
  ) {}
  
  additionalData: any;

  isFetchingData = false;
  isSavingAdditional = false;

  additionalForm = new FormGroup({
    nationality: new FormControl(''),
    religion: new FormControl(''),
    maritalStatus: new FormControl(''),
    eContactName: new FormControl(''),
    eContactNumber: new FormControl(''),
  })

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  
  ngOnInit(): void {
    this.getAdditionalProfile();
  }

  getAdditionalProfile() {
    this.isFetchingData = true;
    const id = localStorage.getItem('uid') as string;

    this.usersApi.getAdditionalUser(id)
      .then((res) => {
        console.log(res);
        this.additionalData = res;
        this.isFetchingData = false;
        this.setAdditionalData();        
      }),
      (err: any) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  updateAdditional() {
    this.isSavingAdditional = true;
    
    const id = sessionStorage.getItem('user_additional_id') as string;

    let data: UserAdditionalProfile = {
      created_at: this.additionalData.data().created_at,
      updated_at: serverTimestamp(),
      nationality: this.additionalForm.controls.nationality.value as string,
      religion: this.additionalForm.controls.religion.value as string,
      marital_status: this.additionalForm.controls.maritalStatus.value as string,
      e_contact_name: this.additionalForm.controls.eContactName.value as string,
      e_contact_number: this.additionalForm.controls.eContactNumber.value as string,
    }

    this.usersApi.updateAdditionalUser(id, data)
      .then((res) => {
        console.log(res);
        this.isSavingAdditional = false;
        this.router.navigateByUrl('/settings/availability');
      })
      .catch((err) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isSavingAdditional = false;
      });
  }

  setAdditionalData(){
    this.additionalForm.controls.nationality.setValue(this.additionalData.data().full_name);
    this.additionalForm.controls.religion.setValue(this.additionalData.data().date_of_birth);
    this.additionalForm.controls.maritalStatus.setValue(this.additionalData.data().ni_number);
    this.additionalForm.controls.eContactName.setValue(this.additionalData.data().email);
    this.additionalForm.controls.eContactNumber.setValue(this.additionalData.data().phone);
  }

}
