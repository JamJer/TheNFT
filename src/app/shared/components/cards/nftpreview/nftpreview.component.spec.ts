import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftpreviewComponent } from './nftpreview.component';

describe('NftpreviewComponent', () => {
  let component: NftpreviewComponent;
  let fixture: ComponentFixture<NftpreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftpreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftpreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
