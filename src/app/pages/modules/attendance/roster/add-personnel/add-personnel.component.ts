import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { serverTimestamp } from 'firebase/firestore';

import { RosterPersonnel } from 'src/app/models/modules/attendance/attendance.model';


@Component({
  selector: 'app-add-personnel',
  templateUrl: './add-personnel.component.html',
  styleUrls: ['./add-personnel.component.scss']
})
export class AddPersonnelComponent {

  @Output() saveItemEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  isItemSaving = false;

  selectedUserData: any;
  selectedBatchData: any;

  rosterPersonnelForm = new FormGroup({
    staffCode: new FormControl(''),
    fullName: new FormControl(''),
    batchSymbol: new FormControl(''),
  })
  
  openModal(){
    this.addButton.nativeElement.click();
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

    this.saveItemEvent.emit(data);
  }

  resetForm(){
    this.rosterPersonnelForm.controls.staffCode.setValue('');
    this.rosterPersonnelForm.controls.fullName.setValue('');
    this.rosterPersonnelForm.controls.batchSymbol.setValue('');
  }

}
