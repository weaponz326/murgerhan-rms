import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { serverTimestamp } from 'firebase/firestore';

import { RosterPersonnel } from 'src/app/models/modules/attendance/attendance.model';


@Component({
  selector: 'app-edit-personnel',
  templateUrl: './edit-personnel.component.html',
  styleUrls: ['./edit-personnel.component.scss']
})
export class EditPersonnelComponent {

  @Output() saveItemEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  rosterPersonnelData: any
  selectedUserData: any;
  selectedBatchData: any;

  isItemSaving = false;

  rosterPersonnelForm = new FormGroup({
    staffCode: new FormControl(''),
    fullName: new FormControl(''),
    batchSymbol: new FormControl(''),
  })
  
  openModal(data: any){
    this.rosterPersonnelData = data;
    this.setRosterShiftData(data);

    this.editButton.nativeElement.click();
  }

  saveItem(){
    let data: RosterPersonnel = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      roster: sessionStorage.getItem('attendance_roster_id') as string,
      personnel: {
        id: this.selectedUserData.id,
        data: {
          staff_id: this.selectedUserData.data.staff_id,
          full_name: this.selectedUserData.data.full_name,
        }
      },
      batch: {
        id: this.selectedBatchData.id,
        data: {
          batch_name: this.selectedBatchData.data.batch_name,
          batch_symbol: this.selectedBatchData.data.batch_symbol,
        }
      }
    }

    let item = {
      id: this.rosterPersonnelData.id,
      data: data
    }

    this.saveItemEvent.emit(item);
  }

  setRosterShiftData(data: any){
    this.rosterPersonnelForm.controls.staffCode.setValue(data.personnel.data.staff_code);
    this.rosterPersonnelForm.controls.fullName.setValue(data.personnel.data.full_name);
    this.rosterPersonnelForm.controls.batchSymbol.setValue(data.batch.data.batch_symbol);
  }

}
