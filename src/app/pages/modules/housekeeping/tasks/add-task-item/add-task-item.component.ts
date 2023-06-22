import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { serverTimestamp } from 'firebase/firestore';

import { TaskItem } from 'src/app/models/modules/housekeeping/housekeeping.model';

import { TaskItemFormComponent } from '../task-item-form/task-item-form.component';
import { SelectUnitComponent } from 'src/app/components/select-windows/housekeeping-windows/select-unit/select-unit.component';


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
  @ViewChild('selectUnitComponentReference', { read: SelectUnitComponent, static: false }) selectUnit!: SelectUnitComponent;

  isItemSaving = false;

  selectedUnitId: any;
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
        id: this.selectedUnitId,
        data: {
          unit_code: this.selectedUnitData.unit_code,
          unit_name: this.selectedUnitData.unit_name,
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

  openUnitWindow(){
    console.log("You are opening select unit window")
    this.selectUnit.openModal();
  }

  onUnitSelected(unitData: any){
    console.log(unitData);
    this.taskItemForm.taskItemForm.controls.unitName.setValue(unitData.data().unit_name);
    this.selectedUnitId = unitData.id;
    this.selectedUnitData = unitData.data();
  }
  
}
