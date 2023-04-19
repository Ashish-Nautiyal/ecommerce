import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickSignupComponent } from './quick-signup.component';

describe('QuickSignupComponent', () => {
  let component: QuickSignupComponent;
  let fixture: ComponentFixture<QuickSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickSignupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
