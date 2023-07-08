import { CanActivateFn } from '@angular/router';

export const viewVendorGuard: CanActivateFn = (route, state) => {
  return true;
};
