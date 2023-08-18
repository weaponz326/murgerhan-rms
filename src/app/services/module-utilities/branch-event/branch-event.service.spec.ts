import { TestBed } from '@angular/core/testing';

import { BranchEventService } from './branch-event.service';

describe('BranchEventService', () => {
  let service: BranchEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
