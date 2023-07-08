import { CanActivateFn } from '@angular/router';

export const viewInvitationGuard: CanActivateFn = (route, state) => {
  return true;
};
