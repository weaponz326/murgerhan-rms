import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';


export const adminAccessGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router)
  const userRole = localStorage.getItem("user_role");
  // console.log(userRole);

  if (
    !!(userRole == "General Manager") ||
    !!(userRole == "Administrator")
  ) {
    return true;
  }
  else{
    return router.navigateByUrl('access-denied');
  }
};
