import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';


export const branchGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router)

  if (!!localStorage.getItem('selected_branch')) {
    return true;
  }
  else{
    return router.navigateByUrl('/landing');
  }
};
