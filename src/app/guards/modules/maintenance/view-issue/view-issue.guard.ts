import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const viewIssueGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  if (!!sessionStorage.getItem('maintenance_issue_id')) {
    return true;
  }
  else{
    return router.navigateByUrl('/modules/maintenance/issues/all-issues');
  }
};
