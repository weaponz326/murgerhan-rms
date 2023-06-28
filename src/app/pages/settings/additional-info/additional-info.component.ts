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
    this.getAdditionalUser();
  }

  getAdditionalUser() {
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

  setAdditionalUser() {
    this.isSavingAdditional = true;
    
    let created_at: any;
    if (this.additionalData.data()) created_at = this.additionalData.data().created_at;
    else created_at = serverTimestamp();

    const id = localStorage.getItem('uid') as string;

    let data: UserAdditionalProfile = {
      created_at: created_at,
      updated_at: serverTimestamp(),
      nationality: this.additionalForm.controls.nationality.value as string,
      religion: this.additionalForm.controls.religion.value as string,
      marital_status: this.additionalForm.controls.maritalStatus.value as string,
      e_contact_name: this.additionalForm.controls.eContactName.value as string,
      e_contact_number: this.additionalForm.controls.eContactNumber.value as string,
    }

    this.usersApi.setAdditionalUser(id, data)
      .then((res) => {
        console.log(res);
        this.isSavingAdditional = false;
        this.router.navigateByUrl('/settings/photo');
      })
      .catch((err) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isSavingAdditional = false;
      });
  }

  setAdditionalData(){
    try{
      this.additionalForm.controls.nationality.setValue(this.additionalData.data().nationality);
      this.additionalForm.controls.religion.setValue(this.additionalData.data().religion);
      this.additionalForm.controls.maritalStatus.setValue(this.additionalData.data().marital_status);
      this.additionalForm.controls.eContactName.setValue(this.additionalData.data().e_contact_name);
      this.additionalForm.controls.eContactNumber.setValue(this.additionalData.data().e_contact_number);
    }
    catch{
      console.log("definitely your first time!");
    }
  }

}
