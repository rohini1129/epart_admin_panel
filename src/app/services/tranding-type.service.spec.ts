import { TestBed } from '@angular/core/testing';

import { TrandingTypeService } from './tranding-type.service';

describe('TrandingTypeService', () => {
  let service: TrandingTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrandingTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
