import { CanActivateFn } from '@angular/router';

export const viewTaskGuard: CanActivateFn = (route, state) => {
  return true;
};
