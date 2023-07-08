import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const viewVendorGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  if (!!sessionStorage.getItem('orders_vendor_id')) {
    return true;
  }
  else{
    return router.navigateByUrl('/modules/orders/vendors/all-vendors');
  }
};
