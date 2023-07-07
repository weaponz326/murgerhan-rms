import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';


export const chefAccessGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router)
  const userRole = localStorage.getItem("user_role");
  console.log(userRole);

  if (
    !!(userRole == "General Manager") ||
    !!(userRole == "Administrator") ||
    !!(userRole == "Head Manager") ||
    !!(userRole == "Head Chef") ||
    !!(userRole == "Manager") ||
    !!(userRole == "Assistant Manager") ||
    !!(userRole == "Chef") ||
    !!(userRole == "Assistant Chef")
  ) {
    return true;
  }
  else{
    return router.navigateByUrl('access-denied');
  }
};
