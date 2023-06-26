import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IssuesRoutingModule } from './issues-routing.module';
import { ModuleUtilitiesModule } from 'src/app/components/module-utilities/module-utilities.module';
import { MaintenanceWindowsModule } from 'src/app/components/select-windows/maintenance-windows/maintenance-windows.module';
import { UsersWindowsModule } from 'src/app/components/select-windows/users-windows/users-windows.module';

import { IssuesPage } from './issues.page';
import { AllMaintenanceIssuesComponent } from './all-maintenance-issues/all-maintenance-issues.component';
import { NewMaintnenanceIssueComponent } from './new-maintnenance-issue/new-maintnenance-issue.component';
import { ViewMaintnenanceIssueComponent } from './view-maintnenance-issue/view-maintnenance-issue.component';
import { MaintenanceIssueFormComponent } from './maintenance-issue-form/maintenance-issue-form.component';
import { IssueImagesComponent } from './issue-images/issue-images.component';


@NgModule({
  declarations: [
    IssuesPage,
    AllMaintenanceIssuesComponent,
    NewMaintnenanceIssueComponent,
    ViewMaintnenanceIssueComponent,
    MaintenanceIssueFormComponent,
    IssueImagesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IssuesRoutingModule,
    ModuleUtilitiesModule,
    MaintenanceWindowsModule,
    UsersWindowsModule
  ]
})
export class IssuesModule { }
