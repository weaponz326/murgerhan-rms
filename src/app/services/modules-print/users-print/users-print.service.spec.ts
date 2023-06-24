import { TestBed } from '@angular/core/testing';

import { UsersPrintService } from './users-print.service';

describe('UsersPrintService', () => {
  let service: UsersPrintService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersPrintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
