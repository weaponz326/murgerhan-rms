import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { serverTimestamp } from 'firebase/firestore';

import { RosterBatch } from 'src/app/models/modules/attendance/attendance.model';


@Component({
  selector: 'app-edit-batch',
  templateUrl: './edit-batch.component.html',
  styleUrls: ['./edit-batch.component.scss']
})
export class EditBatchComponent {

  @Output() saveItemEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  rosterShiftData: any;

  isItemSaving = false;
  isSaved = false;

  rosterBatchForm = new FormGroup({
    batchName: new FormControl('', Validators.required),
    batchSymbol: new FormControl('', Validators.required),
  })
  
  openModal(data: any){
    this.rosterShiftData = data;
    this.setRosterShiftData(data);

    this.editButton.nativeElement.click();
  }

  saveItem(){
    this.isSaved = true;
    
    let data: RosterBatch = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      roster: sessionStorage.getItem('attendance_roster_id') as string,
      batch_name: this.rosterBatchForm.controls.batchName.value as string,
      batch_symbol: this.rosterBatchForm.controls.batchSymbol.value as string,
    }

    let item = {
      id: this.rosterShiftData.id,
      data: data
    }

    if(this.rosterBatchForm.valid)
      this.saveItemEvent.emit(item);
  }

  setRosterShiftData(data: any){
    this.rosterBatchForm.controls.batchName.setValue(data.data().batch_name);
    this.rosterBatchForm.controls.batchSymbol.setValue(data.data().batch_symbol);
  }

}
