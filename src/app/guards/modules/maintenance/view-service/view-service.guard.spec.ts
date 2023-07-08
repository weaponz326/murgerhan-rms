import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { viewServiceGuard } from './view-service.guard';

describe('viewServiceGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => viewServiceGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
