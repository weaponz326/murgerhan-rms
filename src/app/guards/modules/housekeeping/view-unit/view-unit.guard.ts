import { CanActivateFn } from '@angular/router';

export const viewUnitGuard: CanActivateFn = (route, state) => {
  return true;
};
