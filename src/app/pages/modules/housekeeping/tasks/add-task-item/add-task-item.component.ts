import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { serverTimestamp } from 'firebase/firestore';

import { TaskItem } from 'src/app/models/modules/housekeeping/housekeeping.model';

import { TaskItemFormComponent } from '../task-item-form/task-item-form.component';


@Component({
  selector: 'app-add-task-item',
  templateUrl: './add-task-item.component.html',
  styleUrls: ['./add-task-item.component.scss']
})
export class AddTaskItemComponent {

  @Output() saveItemEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('taskItemFormComponentReference', { read: TaskItemFormComponent, static: false }) taskItemForm!: TaskItemFormComponent;

  isItemSaving = false;

  selectedUnitData: any;

  openModal(lastId: any){
    this.taskItemForm.taskItemForm.controls.itemNumber.setValue(lastId + 1);
    this.addButton.nativeElement.click();
  }

  saveItem(){
    let data: TaskItem = {
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      item_number: this.taskItemForm.taskItemForm.controls.itemNumber.value as number,
      task: sessionStorage.getItem('housekeeping_task_id') as string,
      task_description: this.taskItemForm.taskItemForm.controls.taskDescription.value as string,
      unit: {
        id: this.selectedUnitData.id,
        data: {
          unit_code: this.selectedUnitData.data.unit_code,
          unit_name: this.selectedUnitData.data.unit_name,
        }
      },
    }

    if(this.selectedUnitData.id != "")
      this.saveItemEvent.emit(data);
  }

  resetForm(){
    this.taskItemForm.taskItemForm.controls.itemNumber.setValue(null);
    this.taskItemForm.taskItemForm.controls.unitName.setValue('');
    this.taskItemForm.taskItemForm.controls.taskDescription.setValue('');
    this.selectedUnitData = null;
  }

}
