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
  
  contractType: any = null;

  mondayAvailability: any = null;
  mondayTimeFrom: any = null;
  mondayTimeTo: any = null;
  tuesdayAvailability: any = null;
  tuesdayTimeFrom: any = null;
  tuesdayTimeTo: any = null;
  wednesdayAvailability: any = null;
  wednesdayTimeFrom: any = null;
  wednesdayTimeTo: any = null;
  thursdayAvailability: any = null;
  thursdayTimeFrom: any = null;
  thursdayTimeTo: any = null;
  fridayAvailability: any = null;
  fridayTimeFrom: any = null;
  fridayTimeTo: any = null;
  saturdayAvailability: any = null;
  saturdayTimeFrom: any = null;
  saturdayTimeTo: any = null;
  sundayAvailability: any = null;
  sundayTimeFrom: any = null;
  sundayTimeTo: any = null;

  ngOnInit(): void {
    this.getAvailabilityProfile();
  }

  getAvailabilityProfile() {
    this.isFetchingData = true;
    const id = localStorage.getItem('uid') as string;

    this.usersApi.getAvailability(id)
      .then((res) => {
        // console.log(res);
        this.availabilityData = res;
        this.isFetchingData = false;
        this.setAvailabilityData();        
      }),
      (err: any) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  setAvailability() {
    this.isSavingAvailability = true;
    
    let created_at: any;
    if (this.availabilityData.data()) created_at = this.availabilityData.data().created_at;
    else created_at = serverTimestamp();

    const id = localStorage.getItem('uid') as string;

    let data: UserAvailabilty = {
      created_at: created_at,
      updated_at: serverTimestamp(),
      contract_type: this.contractType,
      availability: {
        monday: { available: this.mondayAvailability, time_from: this.mondayTimeFrom, time_to: this.mondayTimeTo },
        tuesday: { available: this.tuesdayAvailability, time_from: this.tuesdayTimeFrom, time_to: this.tuesdayTimeTo },
        wednesday: { available: this.wednesdayAvailability, time_from: this.wednesdayTimeFrom, time_to: this.wednesdayTimeTo },
        thursday: { available: this.thursdayAvailability, time_from: this.thursdayTimeFrom, time_to: this.thursdayTimeTo },
        friday: { available: this.fridayAvailability, time_from: this.fridayTimeFrom, time_to: this.fridayTimeTo },
        saturday: { available: this.saturdayAvailability, time_from: this.saturdayTimeFrom, time_to: this.saturdayTimeTo },
        sunday: { available: this.sundayAvailability, time_from: this.sundayTimeFrom, time_to: this.sundayTimeTo },
      }
    }

    this.usersApi.setAvailability(id, data)
      .then((res) => {
        // console.log(res);
        this.isSavingAvailability = false;
        this.router.navigateByUrl('/settings/terms');
      })
      .catch((err) => {
        // console.log(err);
        this.connectionToast.openToast();
        this.isSavingAvailability = false;
      });
  }

  setAvailabilityData(){
    try{
      this.contractType = this.availabilityData.data().contract_type;

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
    catch{
      // console.log("Just a bit more, first timer :)");
    }
  }

}
