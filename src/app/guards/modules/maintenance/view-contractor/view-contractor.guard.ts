import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const viewContractorGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  if (!!sessionStorage.getItem('maintenance_contractor_id')) {
    return true;
  }
  else{
    return router.navigateByUrl('/modules/maintenance/contractors/all-contractors');
  }
};
