import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { viewInvitationGuard } from './view-invitation.guard';

describe('viewInvitationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => viewInvitationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
