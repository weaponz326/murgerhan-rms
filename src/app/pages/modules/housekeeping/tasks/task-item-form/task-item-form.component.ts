import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-task-item-form',
  templateUrl: './task-item-form.component.html',
  styleUrls: ['./task-item-form.component.scss']
})
export class TaskItemFormComponent {

  @Output() openUnitWindow = new EventEmitter<any>();

  taskItemForm = new FormGroup({
    itemNumber: new FormControl(),
    taskDescription: new FormControl(''),
    unitName: new FormControl({value: '', disabled: true}),
  })

}
