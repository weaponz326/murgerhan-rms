import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Incident } from 'src/app/models/modules/housekeeping/housekeeping.model';
import { HousekeepingApiService } from 'src/app/services/modules-api/housekeeping-api/housekeeping-api.service';

import { IncidentFormComponent } from '../incident-form/incident-form.component';
import { IncidentDetailsComponent } from '../incident-details/incident-details.component';
import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { DeleteModalOneComponent } from 'src/app/components/module-utilities/delete-modal-one/delete-modal-one.component';


@Component({
  selector: 'app-view-incident',
  templateUrl: './view-incident.component.html',
  styleUrls: ['./view-incident.component.scss']
})
export class ViewIncidentComponent {

  constructor(
    private router: Router,
    private housekeepingApi: HousekeepingApiService
  ) {}

  @ViewChild('incidentFormComponentReference', { read: IncidentFormComponent, static: false }) incidentForm!: IncidentFormComponent;
  @ViewChild('incidentDetailsComponentReference', { read: IncidentDetailsComponent, static: false }) incidentDetails!: IncidentDetailsComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalOneComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  incidentData: any;
  selectedBranchData: any;

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
        console.log(res);
        this.incidentData = res;
        this.isFetchingData = false;
        this.setIncidentData();        
      }),
      (err: any) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  updateIncident() {
    this.isSavingIncident = true;
    
    const id = sessionStorage.getItem('housekeeping_incident_id') as string;

    let data: Incident = {
      created_at: this.incidentData.data().created_at,
      updated_at: serverTimestamp(),
      incident_code: this.incidentForm.incidentForm.controls.incidentCode.value as string,
      incident_subject: this.incidentForm.incidentForm.controls.incidentSubject.value as string,
      incident_type: this.incidentForm.incidentForm.controls.incidentType.value as string,
      incident_date: this.incidentForm.incidentForm.controls.incidentDate.value,
      incident_status: this.incidentForm.incidentForm.controls.incidentStatus.value as string,
      description: this.incidentDetails.incidentDetails.controls.description.value as string,
      resolution: this.incidentDetails.incidentDetails.controls.resolution.value as string,
      comments: this.incidentDetails.incidentDetails.controls.comments.value as string,
      branch: {
        id: this.selectedBranchData.id,
        data: {
          branch_name: this.selectedBranchData.data.branch_name,
          location: this.selectedBranchData.data.location,
        }
      }
    }

    this.housekeepingApi.updateIncident(id, data)
      .then((res) => {
        console.log(res);
        this.isSavingIncident = false;
      })
      .catch((err) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isSavingIncident = false;
      });
  }

  deleteIncident() {
    this.isDeletingIncident = true;

    const id = sessionStorage.getItem('housekeeping_incident_id') as string;

    this.housekeepingApi.deleteIncident(id)
      .then((res) => {
        console.log(res);
        this.router.navigateByUrl('modules/housekeeping/incidents/all-incidents')
        this.isDeletingIncident = false;
      })
      .catch((err) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isDeletingIncident = false;
      });
  }

  setIncidentData(){
    this.incidentForm.incidentForm.controls.incidentCode.setValue(this.incidentData.data().incident_code);
    this.incidentForm.incidentForm.controls.incidentSubject.setValue(this.incidentData.data().incident_subject);
    this.incidentForm.incidentForm.controls.incidentType.setValue(this.incidentData.data().incident_type);
    this.incidentForm.incidentForm.controls.incidentDate.setValue(this.incidentData.data().incident_date);
    this.incidentForm.incidentForm.controls.incidentStatus.setValue(this.incidentData.data().incident_status);
    this.incidentDetails.incidentDetails.controls.description.setValue(this.incidentData.data().description);
    this.incidentDetails.incidentDetails.controls.resolution.setValue(this.incidentData.data().resolution);
    this.incidentDetails.incidentDetails.controls.comments.setValue(this.incidentData.data().comments);
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }
  
}
