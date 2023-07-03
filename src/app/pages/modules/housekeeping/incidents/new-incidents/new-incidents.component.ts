import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { Incident } from 'src/app/models/modules/housekeeping/housekeeping.model';
import { HousekeepingApiService } from 'src/app/services/modules-api/housekeeping-api/housekeeping-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { IncidentFormComponent } from '../incident-form/incident-form.component';


@Component({
  selector: 'app-new-incidents',
  templateUrl: './new-incidents.component.html',
  styleUrls: ['./new-incidents.component.scss']
})
export class NewIncidentsComponent {

  constructor(
    private router: Router,
    private housekeepingApi: HousekeepingApiService
  ) {}

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('incidentFormComponentReference', { read: IncidentFormComponent, static: false }) incidentForm!: IncidentFormComponent;

  selectedBranchData: any = JSON.parse(String(localStorage.getItem("selected_branch")));
  
  isSavingIncident = false;

  createIncident() {
    this.incidentForm.isSaved = true;
    
    let data: Incident = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      incident_code: this.incidentForm.incidentForm.controls.incidentCode.value as string,
      incident_subject: this.incidentForm.incidentForm.controls.incidentSubject.value as string,
      incident_type: this.incidentForm.incidentForm.controls.incidentType.value as string,
      incident_date: this.incidentForm.incidentForm.controls.incidentDate.value,
      incident_status: this.incidentForm.incidentForm.controls.incidentStatus.value as string,
      description: "",
      resolution: "",
      comments: "",
      branch: {
        id: this.selectedBranchData.id,
        data: {
          branch_name: this.selectedBranchData.data.branch_name,
          location: this.selectedBranchData.data.location,
        }
      }
    }

    console.log(data);

    if(this.incidentForm.incidentForm.valid){
      this.isSavingIncident = true;

      this.housekeepingApi.createIncident(data)
        .then((res: any) => {
          console.log(res);

          if(res.id){
            sessionStorage.setItem('housekeeping_incident_id', res.id);
            this.router.navigateByUrl("/modules/housekeeping/incidents/view-incident");
          }
          this.isSavingIncident = false;
        })
        .catch((err: any) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isSavingIncident = false;
        });
    }
  }
  
}
