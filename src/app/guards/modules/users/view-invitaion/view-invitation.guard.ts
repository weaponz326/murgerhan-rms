import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const viewInvitationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  if (!!sessionStorage.getItem('users_invitation_id')) {
    return true;
  }
  else{
    return router.navigateByUrl('/modules/users/invitations/all-invitations');
  }
};
