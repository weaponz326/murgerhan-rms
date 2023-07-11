import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { serverTimestamp } from 'firebase/firestore';

import { RosterShift } from 'src/app/models/modules/attendance/attendance.model';


@Component({
  selector: 'app-edit-shift',
  templateUrl: './edit-shift.component.html',
  styleUrls: ['./edit-shift.component.scss']
})
export class EditShiftComponent {

  @Output() saveItemEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  rosterShiftData: any;
  selectedUnitData: any;

  isItemSaving = false;
  isSaved = false;

  rosterShiftForm = new FormGroup({
    shiftName: new FormControl('', Validators.required),
    startTime: new FormControl(),
    endTime: new FormControl(),
  })
  
  openModal(data: any){
    this.rosterShiftData = data;
    this.setRosterShiftData(data);

    this.editButton.nativeElement.click();
  }

  saveItem(){
    this.isSaved = true;
        
    if(this.rosterShiftForm.valid){
      let data: RosterShift = {
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
        roster: sessionStorage.getItem('attendance_roster_id') as string,
        shift_name: this.rosterShiftForm.controls.shiftName.value as string,
        start_time: this.rosterShiftForm.controls.startTime.value,
        end_time: this.rosterShiftForm.controls.endTime.value,
      }
  
      let item = {
        id: this.rosterShiftData.id,
        data: data
      }
  
      this.saveItemEvent.emit(item);
    }
  }

  setRosterShiftData(data: any){
    this.rosterShiftForm.controls.shiftName.setValue(data.data().shift_name);
    this.rosterShiftForm.controls.startTime.setValue(data.data().start_time);
    this.rosterShiftForm.controls.endTime.setValue(data.data().end_time);
  }
  
}
