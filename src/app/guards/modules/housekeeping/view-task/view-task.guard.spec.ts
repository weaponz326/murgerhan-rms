import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { viewTaskGuard } from './view-task.guard';

describe('viewTaskGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => viewTaskGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
