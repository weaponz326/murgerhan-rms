import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const viewRosterGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  if (!!sessionStorage.getItem('attendance_roster_id')) {
    return true;
  }
  else{
    return router.navigateByUrl('/modules/attendance/roster/all_roster');
  }
};
