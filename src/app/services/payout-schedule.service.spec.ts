import { TestBed } from '@angular/core/testing';

import { PayoutScheduleService } from './payout-schedule.service';

describe('PayoutScheduleService', () => {
  let service: PayoutScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayoutScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
