import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleUtilitiesModule } from '../../module-utilities/module-utilities.module';

import { SelectBranchComponent } from './select-branch/select-branch.component';
import { SelectLogComponent } from './select-log/select-log.component';



@NgModule({
  declarations: [
    SelectBranchComponent,
    SelectLogComponent
  ],
  imports: [
    CommonModule,
    ModuleUtilitiesModule,
  ],
  exports: [
    SelectBranchComponent,
    SelectLogComponent
  ]
})
export class AdminWindowsModule { }
