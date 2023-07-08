import { CanActivateFn } from '@angular/router';

export const viewContractorGuard: CanActivateFn = (route, state) => {
  return true;
};
