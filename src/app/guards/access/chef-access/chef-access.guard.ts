import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';


export const chefAccessGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router)
  const userRole = localStorage.getItem("user_role");
  // console.log(userRole);

  if (
    !!(userRole == "General Manager") ||
    !!(userRole == "Administrator") ||
    !!(userRole == "Head Manager") ||
    !!(userRole == "Head Chef") ||
    !!(userRole == "Branch Manager") ||
    !!(userRole == "Assistant Branch Manager") ||
    !!(userRole == "Branch Chef") ||
    !!(userRole == "Assistant Branch Chef")
  ) {
    return true;
  }
  else{
    return router.navigateByUrl('access-denied');
  }
};
