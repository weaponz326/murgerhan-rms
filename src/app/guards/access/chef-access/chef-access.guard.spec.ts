import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { chefAccessGuard } from './chef-access.guard';

describe('chefAccessGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => chefAccessGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
