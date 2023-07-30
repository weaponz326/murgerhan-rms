import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Incident } from 'src/app/models/modules/housekeeping/housekeeping.model';
import { HousekeepingApiService } from 'src/app/services/modules-api/housekeeping-api/housekeeping-api.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { IncidentFormComponent } from '../incident-form/incident-form.component';
import { SelectUserRoleComponent } from 'src/app/components/select-windows/users-windows/select-user-role/select-user-role.component';


@Component({
  selector: 'app-new-incidents',
  templateUrl: './new-incidents.component.html',
  styleUrls: ['./new-incidents.component.scss']
})
export class NewIncidentsComponent {

  constructor(
    private router: Router,
    private housekeepingApi: HousekeepingApiService,
    private formatId: FormatIdService
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('incidentFormComponentReference', { read: IncidentFormComponent, static: false }) incidentForm!: IncidentFormComponent;
  @ViewChild('selectUserRoleComponentReference', { read: SelectUserRoleComponent, static: false }) selectUserRole!: SelectUserRoleComponent;

  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));
  
  selectedUserRoleId: any;
  selectedUserRoleData: any;  

  isFetchingData = false;
  isSavingIncident = false;
  isSaved = false;

  thisId = 0;

  ngOnInit(): void {
    this.getLastIncident();
  }

  getLastIncident(){
    this.isFetchingData = true;

    this.housekeepingApi.getLastIncident()
      .then(
        (res: any) => {
          // console.log(res);
          if(res.docs[0])
            this.thisId = res.docs[0]?.data()?.incident_code + 1;        
          else  
            this.thisId = this.thisId + 1;
          this.incidentForm.incidentForm.controls.incidentCode.setValue(this.formatId.formatId(this.thisId, 5, "#", "NC"));
          this.isFetchingData = false;
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  createIncident() {
    this.incidentForm.isSaved = true;
        
    if(this.incidentForm.incidentForm.valid){
      this.isSavingIncident = true;

      let data = this.setCreateIncidentData();

      this.housekeepingApi.createIncident(data)
        .then((res: any) => {
          // console.log(res);

          if(res.id){
            sessionStorage.setItem('housekeeping_incident_id', res.id);
            this.router.navigateByUrl("/modules/housekeeping/incidents/view-incident");
          }
          this.isSavingIncident = false;
        })
        .catch((err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isSavingIncident = false;
        });
    }
  }

  setCreateIncidentData(){
    let data: Incident = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      incident_code: this.thisId,
      incident_subject: this.incidentForm.incidentForm.controls.incidentSubject.value as string,
      incident_type: this.incidentForm.incidentForm.controls.incidentType.value as string,
      incident_date: this.incidentForm.incidentForm.controls.incidentDate.value,
      incident_status: this.incidentForm.incidentForm.controls.incidentStatus.value as string,
      description: "",
      resolution: "",
      comments: "",
      reported_to: {
        id: this.selectedUserRoleId,
        data: {
          staff_code: this.selectedUserRoleData.staff_code,
          full_name: this.selectedUserRoleData.full_name,
          staff_role: this.selectedUserRoleData.staff_role,
        }
      },
      branch: {
        id: this.selectedBranchData.id,
        data: {
          branch_name: this.selectedBranchData.data.branch_name,
          location: this.selectedBranchData.data.location,
        }
      }
    }

    // console.log(data);
    return data;
  }
  
  openUserRoleWindow(){
    // console.log("You are opening select user role window")
    this.selectUserRole.openModal();
  }

  onUserRoleSelected(userRoleData: any){
    // console.log(userRoleData);
    this.selectedUserRoleData = userRoleData;
    this.incidentForm.incidentForm.controls.reportedTo.setValue(userRoleData.data().full_name);

    this.selectedUserRoleId = userRoleData.id;
    this.selectedUserRoleData = userRoleData.data();
  }

}
