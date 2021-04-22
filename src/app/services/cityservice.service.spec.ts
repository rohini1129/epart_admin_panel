import { TestBed } from '@angular/core/testing';

import { CityserviceService } from './cityservice.service';

describe('CityserviceService', () => {
  let service: CityserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CityserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
