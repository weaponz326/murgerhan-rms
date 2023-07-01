import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';


export function authGuard(): CanActivateChildFn {
  return () => {
    
    if (!!localStorage.getItem('uid')) {
      console.log(true);
      return true;
    }
    else{
      console.log(false)
      return false;
    }
  };
}