import { TestBed } from '@angular/core/testing';

import { MaintenanceApiService } from './maintenance-api.service';

describe('MaintenanceApiService', () => {
  let service: MaintenanceApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaintenanceApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
