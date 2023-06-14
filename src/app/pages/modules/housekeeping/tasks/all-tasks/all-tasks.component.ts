import { Component, ViewChild } from '@angular/core';
import { NewTaskComponent } from '../new-task/new-task.component';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.scss']
})
export class AllTasksComponent {

  @ViewChild('newTaskComponentReference', { read: NewTaskComponent, static: false }) newTask!: NewTaskComponent;

}
