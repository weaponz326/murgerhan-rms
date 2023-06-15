import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RosterRoutingModule } from './roster-routing.module';
import { RosterPage } from './roster.page';
import { AllRosterComponent } from './all-roster/all-roster.component';
import { NewRosterComponent } from './new-roster/new-roster.component';
import { ViewRosterComponent } from './view-roster/view-roster.component';
import { RosterSheetComponent } from './roster-sheet/roster-sheet.component';
import { AllShiftsComponent } from './all-shifts/all-shifts.component';
import { AddShiftComponent } from './add-shift/add-shift.component';
import { EditShiftComponent } from './edit-shift/edit-shift.component';
import { ManagePersonnelComponent } from './manage-personnel/manage-personnel.component';
import { AddPersonnelComponent } from './add-personnel/add-personnel.component';
import { EditPersonnelComponent } from './edit-personnel/edit-personnel.component';
import { ManageBatchesComponent } from './manage-batches/manage-batches.component';
import { AddBatchComponent } from './add-batch/add-batch.component';
import { EditBatchComponent } from './edit-batch/edit-batch.component';


@NgModule({
  declarations: [
    RosterPage,
    AllRosterComponent,
    NewRosterComponent,
    ViewRosterComponent,
    RosterSheetComponent,
    AllShiftsComponent,
    AddShiftComponent,
    EditShiftComponent,
    ManagePersonnelComponent,
    AddPersonnelComponent,
    EditPersonnelComponent,
    ManageBatchesComponent,
    AddBatchComponent,
    EditBatchComponent
  ],
  imports: [
    CommonModule,
    RosterRoutingModule
  ]
})
export class RosterModule { }
