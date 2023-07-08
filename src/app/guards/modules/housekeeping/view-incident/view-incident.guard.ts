import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const viewIncidentGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  if (!!sessionStorage.getItem('housekeeping_incident_id')) {
    return true;
  }
  else{
    return router.navigateByUrl('/modules/housekeeping/incidents/all_incidents');
  }
};
