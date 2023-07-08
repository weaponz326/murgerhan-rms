import { CanActivateFn } from '@angular/router';

export const logDetailsGuard: CanActivateFn = (route, state) => {
  return true;
};
