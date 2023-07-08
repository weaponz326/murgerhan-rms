import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const viewUserGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  if (!!sessionStorage.getItem('users_user_id')) {
    return true;
  }
  else{
    return router.navigateByUrl('/modules/users/users/all-users');
  }
};
