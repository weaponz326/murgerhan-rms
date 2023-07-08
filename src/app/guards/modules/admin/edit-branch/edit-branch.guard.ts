import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const editBranchGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  if (!!sessionStorage.getItem('admin_branch_id')) {
    return true;
  }
  else{
    return router.navigateByUrl('/modules/admin/branches/all-branches');
  }
};
