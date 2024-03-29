import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogsRoutingModule } from './logs-routing.module';
import { ModuleUtilitiesModule } from 'src/app/components/module-utilities/module-utilities.module';

import { LogsPage } from './logs.page';
import { AllLogsComponent } from './all-logs/all-logs.component';
import { LogDetailsComponent } from './log-details/log-details.component';


@NgModule({
  declarations: [
    LogsPage,
    AllLogsComponent,
    LogDetailsComponent
  ],
  imports: [
    CommonModule,
    LogsRoutingModule,
    ModuleUtilitiesModule
  ]
})
export class LogsModule { }
