import { TestBed, inject } from '@angular/core/testing';

import { ReadjsonService } from './readjson.service';

describe('ReadjsonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReadjsonService]
    });
  });

  it('should be created', inject([ReadjsonService], (service: ReadjsonService) => {
    expect(service).toBeTruthy();
  }));
});
