import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IssuesPage } from './issues.page';
import { AllMaintenanceIssuesComponent } from './all-maintenance-issues/all-maintenance-issues.component';
import { NewMaintnenanceIssueComponent } from './new-maintnenance-issue/new-maintnenance-issue.component';
import { ViewMaintnenanceIssueComponent } from './view-maintnenance-issue/view-maintnenance-issue.component';
import { IssueImagesComponent } from './issue-images/issue-images.component';


const routes: Routes = [
  {
    path: "",
    component: IssuesPage,
    canActivateChild: [() => { return !!localStorage.getItem('uid'); }],
    children: [
      { path: "", component: AllMaintenanceIssuesComponent },
      { path: "all-issues", component: AllMaintenanceIssuesComponent },
      { path: "new-issue", component: NewMaintnenanceIssueComponent },
      { path: "view-issue", component: ViewMaintnenanceIssueComponent },
      { path: "issue-images", component: IssueImagesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssuesRoutingModule { }
