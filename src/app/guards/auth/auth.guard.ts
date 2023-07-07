import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';


export const authGuard: CanActivateChildFn = () => {
  const router = inject(Router)

  if (!!localStorage.getItem('uid')) {
    console.log(true);
    return true;
  }
  else{
    console.log(false)
    return router.navigateByUrl('auth/login');
  }
}
