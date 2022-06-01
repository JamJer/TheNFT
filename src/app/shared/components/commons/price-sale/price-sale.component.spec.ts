import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceSaleComponent } from './price-sale.component';

describe('PriceSaleComponent', () => {
  let component: PriceSaleComponent;
  let fixture: ComponentFixture<PriceSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceSaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
