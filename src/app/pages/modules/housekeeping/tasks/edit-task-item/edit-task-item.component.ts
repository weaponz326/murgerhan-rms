import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { serverTimestamp } from 'firebase/firestore';

import { TaskItem } from 'src/app/models/modules/housekeeping/housekeeping.model';

import { TaskItemFormComponent } from '../task-item-form/task-item-form.component';


@Component({
  selector: 'app-edit-task-item',
  templateUrl: './edit-task-item.component.html',
  styleUrls: ['./edit-task-item.component.scss']
})
export class EditTaskItemComponent {

  @Output() saveItemEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('taskItemFormComponentReference', { read: TaskItemFormComponent, static: false }) taskItemForm!: TaskItemFormComponent;

  taskItemData: any;
  selectedUnitData: any;

  isItemSaving = false;

  openModal(data: any){
    this.taskItemData = data;
    this.setTaskItemData(data);

    this.editButton.nativeElement.click();
  }

  saveItem(){
    let data: TaskItem = {
      created_at: this.taskItemData.data().created_at,
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

    let item = {
      id: this.taskItemData.id,
      data: data
    }

    this.saveItemEvent.emit(item);
  }

  setTaskItemData(data: any){
    this.taskItemForm.taskItemForm.controls.itemNumber.setValue(data.item_number);
    this.taskItemForm.taskItemForm.controls.unitName.setValue(data.product?.unit_name);
    this.taskItemForm.taskItemForm.controls.taskDescription.setValue(data.product?.task_description);
    this.selectedUnitData = data.unit;
  }
  
}
