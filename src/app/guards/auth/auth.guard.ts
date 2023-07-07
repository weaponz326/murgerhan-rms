import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';


export const authGuard: CanActivateChildFn = () => {
  const router = inject(Router)

  if (!!localStorage.getItem('uid')) {
    return true;
  }
  else{
    return router.navigateByUrl('auth/login');
  }
}
