import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingTypeComponent } from './trading-type.component';

describe('TradingTypeComponent', () => {
  let component: TradingTypeComponent;
  let fixture: ComponentFixture<TradingTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradingTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
