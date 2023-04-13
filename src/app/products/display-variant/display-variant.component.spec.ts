import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayVariantComponent } from './display-variant.component';

describe('DisplayVariantComponent', () => {
  let component: DisplayVariantComponent;
  let fixture: ComponentFixture<DisplayVariantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayVariantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayVariantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
