import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Incident } from 'src/app/models/modules/housekeeping/housekeeping.model';
import { HousekeepingApiService } from 'src/app/services/modules-api/housekeeping-api/housekeeping-api.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { IncidentFormComponent } from '../incident-form/incident-form.component';
import { IncidentDetailsComponent } from '../incident-details/incident-details.component';
import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalOneComponent } from 'src/app/components/module-utilities/delete-modal-one/delete-modal-one.component';
import { SelectUserRoleComponent } from 'src/app/components/select-windows/users-windows/select-user-role/select-user-role.component';


@Component({
  selector: 'app-view-incident',
  templateUrl: './view-incident.component.html',
  styleUrls: ['./view-incident.component.scss']
})
export class ViewIncidentComponent {

  constructor(
    private router: Router,
    private housekeepingApi: HousekeepingApiService,
    private formatId: FormatIdService
  ) {}

  @ViewChild('incidentFormComponentReference', { read: IncidentFormComponent, static: false }) incidentForm!: IncidentFormComponent;
  @ViewChild('incidentDetailsComponentReference', { read: IncidentDetailsComponent, static: false }) incidentDetails!: IncidentDetailsComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalOneComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;
  @ViewChild('selectUserRoleComponentReference', { read: SelectUserRoleComponent, static: false }) selectUserRole!: SelectUserRoleComponent;

  incidentData: any;

  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));

  selectedUserRoleId: any;
  selectedUserRoleData: any;  

  isFetchingData = false;
  isSavingIncident = false;
  isDeletingIncident = false;

  ngOnInit(): void {
    this.getIncident();
  }

  getIncident() {
    this.isFetchingData = true;
    const id = sessionStorage.getItem('housekeeping_incident_id') as string;

    this.housekeepingApi.getIncident(id)
      .then((res) => {
        // console.log(res);
        this.incidentData = res;
        this.isFetchingData = false;
        this.setIncidentData();        
      }),
      (err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  updateIncident() {
    this.incidentForm.isSaved = true;    
    
    if(this.incidentForm.incidentForm.valid){
      this.isSavingIncident = true;

      const id = sessionStorage.getItem('housekeeping_incident_id') as string;
      let data = this.setUpdateIncidentData();

      this.housekeepingApi.updateIncident(id, data)
        .then((res) => {
          // console.log(res);
          this.isSavingIncident = false;
        })
        .catch((err) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isSavingIncident = false;
        });
    }
  }

  deleteIncident() {
    this.isDeletingIncident = true;

    const id = sessionStorage.getItem('housekeeping_incident_id') as string;

    this.housekeepingApi.deleteIncident(id)
      .then((res) => {
        // console.log(res);
        this.router.navigateByUrl('modules/housekeeping/incidents/all-incidents')
        this.isDeletingIncident = false;
      })
      .catch((err) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isDeletingIncident = false;
      });
  }

  setIncidentData(){
    this.incidentForm.incidentForm.controls.incidentCode.setValue(this.formatId.formatId(this.incidentData.data().incident_code, 5, "#", "NC"));
    this.incidentForm.incidentForm.controls.incidentSubject.setValue(this.incidentData.data().incident_subject);
    this.incidentForm.incidentForm.controls.incidentType.setValue(this.incidentData.data().incident_type);
    this.incidentForm.incidentForm.controls.incidentDate.setValue(this.incidentData.data().incident_date);
    this.incidentForm.incidentForm.controls.incidentStatus.setValue(this.incidentData.data().incident_status);
    this.incidentDetails.incidentDetails.controls.description.setValue(this.incidentData.data().description);
    this.incidentDetails.incidentDetails.controls.resolution.setValue(this.incidentData.data().resolution);
    this.incidentDetails.incidentDetails.controls.comments.setValue(this.incidentData.data().comments);
    this.incidentForm.incidentForm.controls.reportedTo.setValue(this.incidentData.data().reported_to.data.full_name);

    this.selectedUserRoleId = this.incidentData.data().reported_to.id;
    this.selectedUserRoleData = this.incidentData.data().reported_to.data;
  }

  setUpdateIncidentData(){
    let data: Incident = {
      created_at: this.incidentData.data().created_at,
      updated_at: serverTimestamp(),
      incident_code: this.incidentData.data().incident_code,
      incident_subject: this.incidentForm.incidentForm.controls.incidentSubject.value as string,
      incident_type: this.incidentForm.incidentForm.controls.incidentType.value as string,
      incident_date: this.incidentForm.incidentForm.controls.incidentDate.value,
      incident_status: this.incidentForm.incidentForm.controls.incidentStatus.value as string,
      description: this.incidentDetails.incidentDetails.controls.description.value as string,
      resolution: this.incidentDetails.incidentDetails.controls.resolution.value as string,
      comments: this.incidentDetails.incidentDetails.controls.comments.value as string,
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

  confirmDelete(){
    this.deleteModal.openModal();
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
