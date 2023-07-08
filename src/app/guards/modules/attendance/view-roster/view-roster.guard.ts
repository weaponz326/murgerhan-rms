import { CanActivateFn } from '@angular/router';

export const viewRosterGuard: CanActivateFn = (route, state) => {
  return true;
};
