import { CanActivateFn } from '@angular/router';

export const viewSystemGuard: CanActivateFn = (route, state) => {
  return true;
};
