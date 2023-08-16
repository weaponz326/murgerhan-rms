import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const viewServiceGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  if (!!sessionStorage.getItem('maintenance_service_id')) {
    return true;
  }
  else{
    return router.navigateByUrl('/modules/maintenance/services/all-services');
  }
};
