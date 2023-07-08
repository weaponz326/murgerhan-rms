import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const viewUnitGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  if (!!sessionStorage.getItem('housekeeping_unit_id')) {
    return true;
  }
  else{
    return router.navigateByUrl('/modules/housekeeping/units/all_units');
  }
};
