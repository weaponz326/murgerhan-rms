import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from '../../module-utilities/module-utilities.module';

import { SelectTaskComponent } from './select-task/select-task.component';
import { SelectUnitComponent } from './select-unit/select-unit.component';
import { SelectIncidentComponent } from './select-incident/select-incident.component';



@NgModule({
  declarations: [
    SelectTaskComponent,
    SelectUnitComponent,
    SelectIncidentComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ],
  exports: [
    SelectTaskComponent,
    SelectUnitComponent,
    SelectIncidentComponent
  ]
})
export class HousekeepingWindowsModule { }
