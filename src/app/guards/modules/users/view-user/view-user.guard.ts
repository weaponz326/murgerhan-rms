import { CanActivateFn } from '@angular/router';

export const viewUserGuard: CanActivateFn = (route, state) => {
  return true;
};
