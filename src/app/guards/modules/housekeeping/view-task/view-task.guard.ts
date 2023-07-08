import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const viewTaskGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  if (!!sessionStorage.getItem('housekeeping_task_id')) {
    return true;
  }
  else{
    return router.navigateByUrl('/modules/housekeeping/tasks/all_tasks');
  }
};
