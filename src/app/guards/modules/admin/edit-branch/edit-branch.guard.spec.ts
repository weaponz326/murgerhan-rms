import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { editBranchGuard } from './edit-branch.guard';

describe('editBranchGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => editBranchGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
