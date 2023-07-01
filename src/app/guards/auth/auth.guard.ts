import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (!!localStorage.getItem('uid')){
    return true;
  }
  else{
    // this.router.navigateByUrl('/auth/login');
    return false;
  }
};
