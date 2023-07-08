import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const viewPurchasingGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  if (!!sessionStorage.getItem('inventory_purchasing_id')) {
    return true;
  }
  else{
    return router.navigateByUrl('/modules/inventory/purchasing/all-purchasing');
  }
};
