import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { serverTimestamp } from 'firebase/firestore';

import { RosterShift } from 'src/app/models/modules/attendance/attendance.model';


@Component({
  selector: 'app-add-shift',
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.scss']
})
export class AddShiftComponent {

  @Output() saveItemEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  isItemSaving = false;
  isSaved = false;

  rosterShiftForm = new FormGroup({
    shiftName: new FormControl('', Validators.required),
    startTime: new FormControl(),
    endTime: new FormControl(),
  })
  
  openModal(){
    this.addButton.nativeElement.click();
  }

  saveItem(){
    this.isSaved = true;
    
    let data: RosterShift = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      roster: sessionStorage.getItem('attendance_roster_id') as string,
      shift_name: this.rosterShiftForm.controls.shiftName.value as string,
      start_time: this.rosterShiftForm.controls.startTime.value,
      end_time: this.rosterShiftForm.controls.endTime.value,
    }

    if(this.rosterShiftForm.valid)
      this.saveItemEvent.emit(data);
  }

  resetForm(){
    this.rosterShiftForm.controls.shiftName.setValue('');
    this.rosterShiftForm.controls.startTime.setValue(null);
    this.rosterShiftForm.controls.endTime.setValue(null);
  }

}
