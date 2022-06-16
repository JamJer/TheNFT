import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerGalleryHoverComponent } from './container-gallery-hover.component';

describe('Component: ContainerGalleryHoverComponent', () => {
  let component: ContainerGalleryHoverComponent;
  let fixture: ComponentFixture<ContainerGalleryHoverComponent>;
  
  // Setup
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerGalleryHoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerGalleryHoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
