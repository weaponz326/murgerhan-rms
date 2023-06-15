import { Component, ViewChild } from '@angular/core';
import { ManagePersonnelComponent } from '../manage-personnel/manage-personnel.component';
import { AddBatchComponent } from '../add-batch/add-batch.component';
import { EditBatchComponent } from '../edit-batch/edit-batch.component';

@Component({
  selector: 'app-manage-batches',
  templateUrl: './manage-batches.component.html',
  styleUrls: ['./manage-batches.component.scss']
})
export class ManageBatchesComponent {

  @ViewChild('managePersonnelComponentReference', { read: ManagePersonnelComponent, static: false }) managePersonnel!: ManagePersonnelComponent;
  @ViewChild('addBatchComponentReference', { read: AddBatchComponent, static: false }) addBatch!: AddBatchComponent;
  @ViewChild('editBatchComponentReference', { read: EditBatchComponent, static: false }) editBatch!: EditBatchComponent;
  
}
