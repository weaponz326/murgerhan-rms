import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const viewAttendanceGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  if (!!sessionStorage.getItem('attendance_attendance_id')) {
    return true;
  }
  else{
    return router.navigateByUrl('/modules/attendance/attendance/all_attendance');
  }
};
