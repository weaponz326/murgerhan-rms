import { CanActivateFn } from '@angular/router';

export const viewPurchasingGuard: CanActivateFn = (route, state) => {
  return true;
};
