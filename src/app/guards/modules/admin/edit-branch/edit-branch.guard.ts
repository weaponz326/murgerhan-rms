import { CanActivateFn } from '@angular/router';

export const editBranchGuard: CanActivateFn = (route, state) => {
  return true;
};
