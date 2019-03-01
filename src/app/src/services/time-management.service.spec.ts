import { TestBed } from '@angular/core/testing';

import { TimeManagementService } from './time-management.service';

describe('TimeManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimeManagementService = TestBed.get(TimeManagementService);
    expect(service).toBeTruthy();
  });
});
