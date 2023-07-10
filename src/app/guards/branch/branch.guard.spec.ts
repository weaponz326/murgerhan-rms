import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { branchGuard } from './branch.guard';

describe('branchGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => branchGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
