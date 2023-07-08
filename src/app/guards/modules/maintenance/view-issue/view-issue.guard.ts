import { CanActivateFn } from '@angular/router';

export const viewIssueGuard: CanActivateFn = (route, state) => {
  return true;
};
