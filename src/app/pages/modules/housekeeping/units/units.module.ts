import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UnitsRoutingModule } from './units-routing.module';
import { ModuleUtilitiesModule } from 'src/app/components/module-utilities/module-utilities.module';

import { UnitsPage } from './units.page';
import { AllUnitsComponent } from './all-units/all-units.component';
import { AddUnitComponent } from './add-unit/add-unit.component';
import { EditUnitComponent } from './edit-unit/edit-unit.component';
import { UnitFormComponent } from './unit-form/unit-form.component';


@NgModule({
  declarations: [
    UnitsPage,
    AllUnitsComponent,
    AddUnitComponent,
    EditUnitComponent,
    UnitFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    UnitsRoutingModule,
    ModuleUtilitiesModule,
  ]
})
export class UnitsModule { }
