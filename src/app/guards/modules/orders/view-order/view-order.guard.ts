import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const viewOrderGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  if (!!sessionStorage.getItem('orders_order_id')) {
    return true;
  }
  else{
    return router.navigateByUrl('/modules/orders/orders/all-orders');
  }
};
