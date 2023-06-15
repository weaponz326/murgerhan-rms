import { Component, ViewChild } from '@angular/core';
import { AddPersonnelComponent } from '../add-personnel/add-personnel.component';
import { EditPersonnelComponent } from '../edit-personnel/edit-personnel.component';

@Component({
  selector: 'app-manage-personnel',
  templateUrl: './manage-personnel.component.html',
  styleUrls: ['./manage-personnel.component.scss']
})
export class ManagePersonnelComponent {

  @ViewChild('addPersonnelComponentReference', { read: AddPersonnelComponent, static: false }) addPersonnel!: AddPersonnelComponent;
  @ViewChild('editPersonnelComponentReference', { read: EditPersonnelComponent, static: false }) editPersonnel!: EditPersonnelComponent;
  
}
