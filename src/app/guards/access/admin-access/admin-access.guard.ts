import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';


export const adminAccessGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router)
  const userRole = JSON.parse(String(localStorage.getItem("selected_user_role"))).staff_role;
  console.log(userRole);

  if (
    !!(userRole == "General Manager") ||
    !!(userRole == "Administrator") ||
    !!(userRole == "Head Manager") ||
    !!(userRole == "Head Chef")
  ) {
    console.log(true);
    return true;
  }
  else{
    console.log(false)
    return router.navigateByUrl('access-denied');
  }
};
