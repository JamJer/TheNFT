import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NFTDtailComponent } from './nftdtail.component';

describe('NFTDtailComponent', () => {
  let component: NFTDtailComponent;
  let fixture: ComponentFixture<NFTDtailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NFTDtailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NFTDtailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
