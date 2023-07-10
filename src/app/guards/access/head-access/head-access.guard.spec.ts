import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { headAccessGuard } from './head-access.guard';

describe('headAccessGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => headAccessGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
