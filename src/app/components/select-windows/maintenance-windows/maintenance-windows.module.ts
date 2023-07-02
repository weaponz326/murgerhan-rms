import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModuleUtilitiesModule } from '../../module-utilities/module-utilities.module';

import { SelectIssueComponent } from './select-issue/select-issue.component';
import { SelectServiceComponent } from './select-service/select-service.component';
import { SelectContractorComponent } from './select-contractor/select-contractor.component';
import { SelectSystemComponent } from './select-system/select-system.component';



@NgModule({
  declarations: [
    SelectIssueComponent,
    SelectServiceComponent,
    SelectContractorComponent,
    SelectSystemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ModuleUtilitiesModule,
  ],
  exports: [
    SelectIssueComponent,
    SelectServiceComponent,
    SelectContractorComponent,
    SelectSystemComponent
  ]
})
export class MaintenanceWindowsModule { }
