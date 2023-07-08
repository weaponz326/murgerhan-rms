import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { viewUserGuard } from './view-user.guard';

describe('viewUserGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => viewUserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
