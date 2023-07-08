import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { viewSystemGuard } from './view-system.guard';

describe('viewSystemGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => viewSystemGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
