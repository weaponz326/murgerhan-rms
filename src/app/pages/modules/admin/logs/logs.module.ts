import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogsRoutingModule } from './logs-routing.module';
import { LogsPage } from './logs.page';


@NgModule({
  declarations: [
    LogsPage
  ],
  imports: [
    CommonModule,
    LogsRoutingModule
  ]
})
export class LogsModule { }
