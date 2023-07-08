import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const viewProductGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  if (!!sessionStorage.getItem('orders_product_id')) {
    return true;
  }
  else{
    return router.navigateByUrl('/modules/orders/products/all-products');
  }
};
