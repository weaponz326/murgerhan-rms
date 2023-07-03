import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { serverTimestamp } from 'firebase/firestore';

import { RosterBatch } from 'src/app/models/modules/attendance/attendance.model';


@Component({
  selector: 'app-add-batch',
  templateUrl: './add-batch.component.html',
  styleUrls: ['./add-batch.component.scss']
})
export class AddBatchComponent {

  @Output() saveItemEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  isItemSaving = false;
  isSaved = false;

  rosterBatchForm = new FormGroup({
    batchName: new FormControl('', Validators.required),
    batchSymbol: new FormControl('', Validators.required),
  })
  
  openModal(){
    this.addButton.nativeElement.click();
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

    if(this.rosterBatchForm.valid)
      this.saveItemEvent.emit(data);
  }

  resetForm(){
    this.rosterBatchForm.controls.batchName.setValue('');
    this.rosterBatchForm.controls.batchSymbol.setValue('');
  }

}
