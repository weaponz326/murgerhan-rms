import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssuesRoutingModule } from './issues-routing.module';
import { IssuesPage } from './issues.page';
import { AllMaintenanceIssuesComponent } from './all-maintenance-issues/all-maintenance-issues.component';
import { NewMaintnenanceIssueComponent } from './new-maintnenance-issue/new-maintnenance-issue.component';
import { ViewMaintnenanceIssueComponent } from './view-maintnenance-issue/view-maintnenance-issue.component';
import { MaintenanceIssueFormComponent } from './maintenance-issue-form/maintenance-issue-form.component';


@NgModule({
  declarations: [
    IssuesPage,
    AllMaintenanceIssuesComponent,
    NewMaintnenanceIssueComponent,
    ViewMaintnenanceIssueComponent,
    MaintenanceIssueFormComponent
  ],
  imports: [
    CommonModule,
    IssuesRoutingModule
  ]
})
export class IssuesModule { }
