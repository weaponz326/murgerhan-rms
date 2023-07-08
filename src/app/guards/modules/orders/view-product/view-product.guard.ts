import { CanActivateFn } from '@angular/router';

export const viewProductGuard: CanActivateFn = (route, state) => {
  return true;
};
