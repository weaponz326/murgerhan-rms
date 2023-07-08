import { CanActivateFn } from '@angular/router';

export const viewIncidentGuard: CanActivateFn = (route, state) => {
  return true;
};
