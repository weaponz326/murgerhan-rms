import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { serverTimestamp } from 'firebase/firestore';

import { CategoryChecklist } from 'src/app/models/modules/inventory/inventory.model';


@Component({
  selector: 'app-edit-checklist',
  templateUrl: './edit-checklist.component.html',
  styleUrls: ['./edit-checklist.component.scss']
})
export class EditChecklistComponent {

  @Output() saveItemEvent = new EventEmitter<any>();
  @Output() deleteItemEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  checklistData: any;

  isItemSaving = false;
  isItemDeleting = false;

  checklistForm = new FormGroup({
    itemNumber: new FormControl(),
    description: new FormControl(''),
  })

  openModal(data: any){
    this.checklistData = data;
    this.setChecklistData(data);

    this.editButton.nativeElement.click();
  }

  saveItem(){
    let data: CategoryChecklist = {
      created_at: this.checklistData.data().created_at,
      updated_at: serverTimestamp(),
      item_number: this.checklistForm.controls.itemNumber.value as number,
      category: sessionStorage.getItem('inventory_category_id') as string,
      description: this.checklistForm.controls.description.value as string,
    }

    let item = {
      id: this.checklistData.id,
      data: data
    }

    this.saveItemEvent.emit(item);
  }

  deleteItem(){
    this.deleteItemEvent.emit(this.checklistData.id);
  }
  
  setChecklistData(data: any){
    this.checklistForm.controls.itemNumber.setValue(data.data().item_number);
    this.checklistForm.controls.description.setValue(data.data().description);
  }
  
}
