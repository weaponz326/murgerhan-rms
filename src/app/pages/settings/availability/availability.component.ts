import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { serverTimestamp } from 'firebase/firestore';

import { UserAvailabilty } from 'src/app/models/modules/users/users.model';
import { UsersApiService } from 'src/app/services/modules-api/users-api/users-api.service';

import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss']
})
export class AvailabilityComponent {

  constructor(
    private router: Router,
    private usersApi: UsersApiService
  ) {}
  
  availabilityData: any;

  isFetchingData = false;
  isSavingAvailability = false;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  
  contractType: any;

  mondayAvailability: any;
  mondayTimeFrom: any;
  mondayTimeTo: any;
  tuesdayAvailability: any;
  tuesdayTimeFrom: any;
  tuesdayTimeTo: any;
  wednesdayAvailability: any;
  wednesdayTimeFrom: any;
  wednesdayTimeTo: any;
  thursdayAvailability: any;
  thursdayTimeFrom: any;
  thursdayTimeTo: any;
  fridayAvailability: any;
  fridayTimeFrom: any;
  fridayTimeTo: any;
  saturdayAvailability: any;
  saturdayTimeFrom: any;
  saturdayTimeTo: any;
  sundayAvailability: any;
  sundayTimeFrom: any;
  sundayTimeTo: any;

  ngOnInit(): void {
    this.getAvailabilityProfile();
  }

  getAvailabilityProfile() {
    this.isFetchingData = true;
    const id = localStorage.getItem('uid') as string;

    this.usersApi.getAvailability(id)
      .then((res) => {
        console.log(res);
        this.availabilityData = res;
        this.isFetchingData = false;
        this.setAvailabilityData();        
      }),
      (err: any) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  updateAvailability() {
    this.isSavingAvailability = true;
    
    const id = sessionStorage.getItem('user_availability_id') as string;

    let data: UserAvailabilty = {
      created_at: this.availabilityData.data().created_at,
      updated_at: serverTimestamp(),
      contract_type: this.contractType,
      availability: {
        monday: { available: this.mondayAvailability, time_from: this.mondayTimeFrom, time_to: this.mondayTimeTo },
        tuesday: { available: this.mondayAvailability, time_from: this.mondayTimeFrom, time_to: this.mondayTimeTo },
        wednesday: { available: this.mondayAvailability, time_from: this.mondayTimeFrom, time_to: this.mondayTimeTo },
        thursday: { available: this.mondayAvailability, time_from: this.mondayTimeFrom, time_to: this.mondayTimeTo },
        friday: { available: this.mondayAvailability, time_from: this.mondayTimeFrom, time_to: this.mondayTimeTo },
        saturday: { available: this.mondayAvailability, time_from: this.mondayTimeFrom, time_to: this.mondayTimeTo },
        sunday: { available: this.mondayAvailability, time_from: this.mondayTimeFrom, time_to: this.mondayTimeTo },
      }
    }

    this.usersApi.updateAvailability(id, data)
      .then((res) => {
        console.log(res);
        this.isSavingAvailability = false;
        this.router.navigateByUrl('/settings/terms');
      })
      .catch((err) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isSavingAvailability = false;
      });
  }

  setAvailabilityData(){
    this.contractType = this.availabilityData.contract_type;

    this.mondayAvailability = this.availabilityData.data().availability.monday.available;
    this.mondayTimeFrom = this.availabilityData.data().availability.monday.time_from;
    this.mondayTimeTo = this.availabilityData.data().availability.monday.time_to;
    this.tuesdayAvailability = this.availabilityData.data().availability.tuesday.available;
    this.tuesdayTimeFrom = this.availabilityData.data().availability.tuesday.time_from;
    this.tuesdayTimeTo = this.availabilityData.data().availability.tuesday.time_to;
    this.wednesdayAvailability = this.availabilityData.data().availability.wednesday.available;
    this.wednesdayTimeFrom = this.availabilityData.data().availability.wednesday.time_from;
    this.wednesdayTimeTo = this.availabilityData.data().availability.wednesday.time_to;
    this.thursdayAvailability = this.availabilityData.data().availability.thursday.available;
    this.thursdayTimeFrom = this.availabilityData.data().availability.thursday.time_from;
    this.thursdayTimeTo = this.availabilityData.data().availability.thursday.time_to;
    this.fridayAvailability = this.availabilityData.data().availability.friday.available;
    this.fridayTimeFrom = this.availabilityData.data().availability.friday.time_from;
    this.fridayTimeTo = this.availabilityData.data().availability.friday.time_to;
    this.saturdayAvailability = this.availabilityData.data().availability.saturday.available;
    this.saturdayTimeFrom = this.availabilityData.data().availability.saturday.time_from;
    this.saturdayTimeTo = this.availabilityData.data().availability.saturday.time_to;
    this.sundayAvailability = this.availabilityData.data().availability.sunday.available;
    this.sundayTimeFrom = this.availabilityData.data().availability.sunday.time_from;
    this.sundayTimeTo = this.availabilityData.data().availability.sunday.time_to;
  }

}
