import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { serverTimestamp } from 'firebase/firestore';

import { CategoryChecklist } from 'src/app/models/modules/inventory/inventory.model';


@Component({
  selector: 'app-add-checklist',
  templateUrl: './add-checklist.component.html',
  styleUrls: ['./add-checklist.component.scss']
})
export class AddChecklistComponent {

  @Output() saveItemEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  isItemSaving = false;

  checklistForm = new FormGroup({
    itemNumber: new FormControl(),
    description: new FormControl(''),
  })
  
  openModal(lastId: any){
    this.checklistForm.controls.itemNumber.setValue(lastId + 1);
    this.addButton.nativeElement.click();
  }

  saveItem(){
    let data: CategoryChecklist = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      item_number: this.checklistForm.controls.itemNumber.value as number,
      category: sessionStorage.getItem('inventory_category_id') as string,
      description: this.checklistForm.controls.description.value as string,
    }

    this.saveItemEvent.emit(data);
  }

  resetForm(){
    this.checklistForm.controls.itemNumber.setValue(null);
    this.checklistForm.controls.description.setValue('');
  }
  
}
