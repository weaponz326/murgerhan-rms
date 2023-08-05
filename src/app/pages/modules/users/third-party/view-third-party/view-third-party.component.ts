import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { ThirdPartyRole } from 'src/app/models/modules/users/users.model';
import { UsersApiService } from 'src/app/services/modules-api/users-api/users-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalOneComponent } from 'src/app/components/module-utilities/delete-modal-one/delete-modal-one.component';


@Component({
  selector: 'app-view-third-party',
  templateUrl: './view-third-party.component.html',
  styleUrls: ['./view-third-party.component.scss']
})
export class ViewThirdPartyComponent {

  constructor(
    private router: Router,
    private usersApi: UsersApiService
  ) {}
  
  roleData: any;
  basicProfileData: any;

  isFetchingData = false;
  isSavingRole = false;
  isDeletingRole = false;
  isSaved = false;

  roleForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    userCode: new FormControl(''),
    companyCode: new FormControl({value: '', disabled: true}, Validators.required),
    companyName: new FormControl({value: '', disabled: true}, Validators.required),
    companyType: new FormControl('', Validators.required),
  })

  selectedVendorId: any;
  selectedVendorData: any;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalOneComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;
  
  ngOnInit(): void {
    this.getThirdPartyRole();
  }

  getThirdPartyRole() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('users_user_id') as string;

    this.usersApi.getThirdPartyRole(id)
      .then((res) => {
        // console.log(res);
        this.roleData = res;
        this.isFetchingData = false;
        this.setRoleData();
        
        if (this.roleData.data().full_name == "")
          this.getBasicUser();
      }),
      (err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  getBasicUser() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('users_user_id') as string;

    this.usersApi.getBasicUser(id)
      .then((res) => {
        // console.log(res);
        this.basicProfileData = res;
        this.isFetchingData = false;

        this.roleForm.controls.fullName.setValue(this.basicProfileData.data().full_name);
      }),
      (err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  updateThirdPartyRole() {
    this.isSaved = true;    
    
    if(this.roleForm.valid && this.selectedVendorId){
      this.isSavingRole = true; 

      const id = sessionStorage.getItem('users_user_id') as string;
      let data = this.setUpdateThirdPartyRoleData();

      this.usersApi.updateThirdPartyRole(id, data)
        .then((res) => {
          // console.log(res);
          this.isSavingRole = false;
        })
        .catch((err) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isSavingRole = false;
        });
    }
  }

  deleteThirdPartyRole(){
    this.isDeletingRole = true;

    const id = sessionStorage.getItem('users_user_id') as string;

    this.usersApi.deleteThirdPartyRole(id)
      .then((res) => {
        // console.log(res);
        this.router.navigateByUrl('modules/users/users/all-users')
        this.isDeletingRole = false;
      })
      .catch((err) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isDeletingRole = false;
      });
  }

  setRoleData(){
    this.roleForm.controls.fullName.setValue(this.roleData.data().full_name);
    this.roleForm.controls.userCode.setValue(this.roleData.data().user_code);
    this.roleForm.controls.companyCode.setValue(this.roleData.data().company?.data.company_code);
    this.roleForm.controls.companyName.setValue(this.roleData.data().company?.data.company_name);
    this.roleForm.controls.companyType.setValue(this.roleData.data().company_type);

    this.selectedVendorId = this.roleData.data().vendor.id;
    this.selectedVendorData = this.roleData.data().vendor.data;
  }

  setUpdateThirdPartyRoleData(){
    let data: ThirdPartyRole = {
      created_at: this.roleData.data().created_at,
      updated_at: serverTimestamp(),
      full_name: this.roleForm.controls.fullName.value as string,
      user_code: this.roleForm.controls.userCode.value as string,
      company_type: this.roleForm.controls.companyType.value as string,
      company: {
        id: this.selectedVendorId,
        data: {
          company_code: this.selectedVendorData.company_code,
          company_name: this.selectedVendorData.company_name,
          phone: this.selectedVendorData.phone,
          email: this.selectedVendorData.email
        }
      },
    }

    // console.log(data)
    return data;
  }

  openVendorWindow(){
    // console.log("You are opening select branch window")
    // this.selectVendor.openModal();
  }

  onVendorSelected(data: any){
    // console.log(data);

    this.roleForm.controls.companyCode.setValue(data.data().vendor_code);
    this.roleForm.controls.companyName.setValue(data.data().vendor_name);
    this.selectedVendorId = data.id;
    this.selectedVendorData = data.data();
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

}
