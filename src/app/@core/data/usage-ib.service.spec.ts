import { TestBed, inject } from '@angular/core/testing';

import { UsageIbService } from './usage-ib.service';

describe('UsageIbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsageIbService]
    });
  });

  it('should be created', inject([UsageIbService], (service: UsageIbService) => {
    expect(service).toBeTruthy();
  }));
});
