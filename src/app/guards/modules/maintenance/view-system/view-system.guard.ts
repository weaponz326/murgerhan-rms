import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const viewSystemGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  if (!!sessionStorage.getItem('maintenance_system_id')) {
    return true;
  }
  else{
    return router.navigateByUrl('/modules/maintenance/systems/all-systems');
  }
};
