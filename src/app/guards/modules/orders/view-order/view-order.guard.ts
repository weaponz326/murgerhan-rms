import { CanActivateFn } from '@angular/router';

export const viewOrderGuard: CanActivateFn = (route, state) => {
  return true;
};
