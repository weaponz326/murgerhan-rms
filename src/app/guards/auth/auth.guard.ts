import { inject } from '@angular/core';
import { Router } from '@angular/router';


export const authGuard = () => {
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
