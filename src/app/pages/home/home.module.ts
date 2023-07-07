import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ModuleUtilitiesModule } from 'src/app/components/module-utilities/module-utilities.module';

import { HomePage } from './home.page';
import { LandingComponent } from './landing/landing.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';


@NgModule({
  declarations: [
    HomePage,
    LandingComponent,
    AccessDeniedComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ModuleUtilitiesModule
  ]
})
export class HomeModule { }
