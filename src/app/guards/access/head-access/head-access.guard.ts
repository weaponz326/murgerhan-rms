import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';


export const headAccessGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router)
  const userRole = localStorage.getItem("user_role");
  // console.log(userRole);

  if (
    !!(userRole == "General Manager") ||
    !!(userRole == "Administrator") ||
    !!(userRole == "Head Manager") ||
    !!(userRole == "Head Chef")
  ) {
    return true;
  }
  else{
    return router.navigateByUrl('access-denied');
  }
};
