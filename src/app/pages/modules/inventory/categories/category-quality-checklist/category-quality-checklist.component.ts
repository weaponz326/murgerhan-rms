import { Component, ViewChild } from '@angular/core';
import { AddChecklistComponent } from '../add-checklist/add-checklist.component';
import { EditChecklistComponent } from '../edit-checklist/edit-checklist.component';

@Component({
  selector: 'app-category-quality-checklist',
  templateUrl: './category-quality-checklist.component.html',
  styleUrls: ['./category-quality-checklist.component.scss']
})
export class CategoryQualityChecklistComponent {

  @ViewChild('addChecklistComponentReference', { read: AddChecklistComponent, static: false }) addChecklist!: AddChecklistComponent;
  @ViewChild('editChecklistComponentReference', { read: EditChecklistComponent, static: false }) editChecklist!: EditChecklistComponent;
  
}
