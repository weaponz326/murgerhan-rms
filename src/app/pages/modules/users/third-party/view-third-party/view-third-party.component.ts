import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { ThirdPartyRole } from 'src/app/models/modules/users/users.model';
import { UsersApiService } from 'src/app/services/modules-api/users-api/users-api.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalOneComponent } from 'src/app/components/module-utilities/delete-modal-one/delete-modal-one.component';
import { SelectVendorComponent } from 'src/app/components/select-windows/orders-windows/select-vendor/select-vendor.component';
import { SelectSupplierComponent } from 'src/app/components/select-windows/inventory-windows/select-supplier/select-supplier.component';


@Component({
  selector: 'app-view-third-party',
  templateUrl: './view-third-party.component.html',
  styleUrls: ['./view-third-party.component.scss']
})
export class ViewThirdPartyComponent {

  constructor(
    private router: Router,
    private usersApi: UsersApiService,
    private formatId: FormatIdService
  ) {}
  
  @ViewChild('selectVendorComponentReference', { read: SelectVendorComponent, static: false }) selectVendor!: SelectVendorComponent;
  @ViewChild('selectSupplierComponentReference', { read: SelectSupplierComponent, static: false }) selectSupplier!: SelectSupplierComponent;

  roleData: any;
  basicProfileData: any;

  isFetchingData = false;
  isSavingRole = false;
  isDeletingRole = false;
  isSaved = false;

  roleForm = new FormGroup({
    email: new FormControl({value: '', disabled: true}),
    fullName: new FormControl('', Validators.required),
    userCode: new FormControl(''),
    companyCode: new FormControl({value: '', disabled: true}, Validators.required),
    companyName: new FormControl({value: '', disabled: true}, Validators.required),
    companyType: new FormControl('', Validators.required),
  })

  selectedCompanyId: any;
  selectedCompanyData: any;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalOneComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;
  
  ngOnInit(): void {
    this.getThirdPartyRole();
  }

  getThirdPartyRole() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('users_third_party_id') as string;

    this.usersApi.getThirdPartyRole(id)
      .then((res) => {
        // console.log(res);
        this.roleData = res;
        this.isFetchingData = false;
        this.setRoleData();        
      }),
      (err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  updateThirdPartyRole() {
    this.isSaved = true;    
    
    if(this.roleForm.valid && this.selectedCompanyId){
      this.isSavingRole = true; 

      const id = sessionStorage.getItem('users_third_party_id') as string;
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

    const id = sessionStorage.getItem('users_third_party_id') as string;

    this.usersApi.deleteThirdPartyRole(id)
      .then((res) => {
        // console.log(res);
        this.router.navigateByUrl('modules/users/users/third-party')
        this.isDeletingRole = false;
      })
      .catch((err) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isDeletingRole = false;
      });
  }

  setRoleData(){
    this.roleForm.controls.email.setValue(this.roleData.data().email);
    this.roleForm.controls.fullName.setValue(this.roleData.data().full_name);
    this.roleForm.controls.userCode.setValue(this.roleData.data().user_code);
    this.roleForm.controls.companyCode.setValue(this.formatId.formatId(this.roleData.data().company?.data.company_code, 4, "#", "VE"));
    this.roleForm.controls.companyName.setValue(this.roleData.data().company?.data.company_name);
    this.roleForm.controls.companyType.setValue(this.roleData.data().company_type);

    this.selectedCompanyId = this.roleData.data().company.id;
    this.selectedCompanyData = this.roleData.data().company.data;
  }

  setUpdateThirdPartyRoleData(){
    let data: ThirdPartyRole = {
      created_at: this.roleData.data().created_at,
      updated_at: serverTimestamp(),
      email: this.roleData.data().email,
      full_name: this.roleForm.controls.fullName.value as string,
      user_code: this.roleForm.controls.userCode.value as string,
      company_type: this.roleForm.controls.companyType.value as string,
      company: {
        id: this.selectedCompanyId,
        data: {
          company_code: this.selectedCompanyData.company_code,
          company_name: this.selectedCompanyData.company_name,
          phone: this.selectedCompanyData.phone,
          email: this.selectedCompanyData.email
        }
      },
    }

    // console.log(data)
    return data;
  }

  openCompanyWindow(){
    if(this.roleForm.controls.companyType.value == "Vendor")
      this.openVendorWindow();
    if(this.roleForm.controls.companyType.value == "Supplier")
      this.openSupplierWindow();
  }

  openVendorWindow(){
    // console.log("You are opening select branch window")
    this.selectVendor.openModal();
  }

  onVendorSelected(data: any){
    // console.log(data);

    this.roleForm.controls.companyCode.setValue(data.data().vendor_code);
    this.roleForm.controls.companyName.setValue(data.data().vendor_name);
    this.selectedCompanyId = data.id;
    this.selectedCompanyData = {
      company_code: data.data().vendor_code,
      company_name: data.data().vendor_name,
      phone: data.data().phone,
      email: data.data().email,
    };
  }

  openSupplierWindow(){
    // console.log("You are opening select branch window")
    this.selectSupplier.openModal();
  }

  onSupplierSelected(data: any){
    // console.log(data);

    this.roleForm.controls.companyCode.setValue(data.data().suplier_code);
    this.roleForm.controls.companyName.setValue(data.data().suplier_name);
    this.selectedCompanyId = data.id;
    this.selectedCompanyData = {
      company_code: data.data().suppler_code,
      company_name: data.data().suppler_name,
      phone: data.data().phone,
      email: data.data().email,
    };
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  getFormatId(id: any){
    return this.formatId.formatId(id, 4, "#", "VE");
  }

}
