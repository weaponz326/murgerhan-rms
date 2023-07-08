import { CanActivateFn } from '@angular/router';

export const viewServiceGuard: CanActivateFn = (route, state) => {
  return true;
};
