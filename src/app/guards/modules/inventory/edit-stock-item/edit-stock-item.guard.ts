import { CanActivateFn } from '@angular/router';

export const editStockItemGuard: CanActivateFn = (route, state) => {
  return true;
};
