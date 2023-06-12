import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RosterRoutingModule } from './roster-routing.module';
import { RosterPage } from './roster.page';


@NgModule({
  declarations: [
    RosterPage
  ],
  imports: [
    CommonModule,
    RosterRoutingModule
  ]
})
export class RosterModule { }
