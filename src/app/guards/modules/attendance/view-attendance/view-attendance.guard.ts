import { CanActivateFn } from '@angular/router';

export const viewAttendanceGuard: CanActivateFn = (route, state) => {
  return true;
};
