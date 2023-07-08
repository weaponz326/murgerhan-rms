import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';


export const managerAccessGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router)
  const userRole = localStorage.getItem("user_role");
  // console.log(userRole);

  if (
    !!(userRole == "General Manager") ||
    !!(userRole == "Administrator") ||
    !!(userRole == "Head Manager") ||
    !!(userRole == "Head Chef") ||
    !!(userRole == "Manager") ||
    !!(userRole == "Assistant Manager") 
  ) {
    return true;
  }
  else{
    return router.navigateByUrl('access-denied');
  }
};
