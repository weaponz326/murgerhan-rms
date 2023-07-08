import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IssuesPage } from './issues.page';
import { AllMaintenanceIssuesComponent } from './all-maintenance-issues/all-maintenance-issues.component';
import { NewMaintnenanceIssueComponent } from './new-maintnenance-issue/new-maintnenance-issue.component';
import { ViewMaintnenanceIssueComponent } from './view-maintnenance-issue/view-maintnenance-issue.component';
import { IssueImagesComponent } from './issue-images/issue-images.component';

import { viewIssueGuard } from 'src/app/guards/modules/maintenance/view-issue/view-issue.guard';


const routes: Routes = [
  {
    path: "",
    component: IssuesPage,
    children: [
      { path: "", component: AllMaintenanceIssuesComponent },
      { path: "all-issues", component: AllMaintenanceIssuesComponent },
      { path: "new-issue", component: NewMaintnenanceIssueComponent },
      { path: "view-issue", component: ViewMaintnenanceIssueComponent, canActivate: [viewIssueGuard] },
      { path: "issue-images", component: IssueImagesComponent, canActivate: [viewIssueGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssuesRoutingModule { }
