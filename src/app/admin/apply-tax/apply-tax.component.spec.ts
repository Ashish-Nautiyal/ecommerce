import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyTaxComponent } from './apply-tax.component';

describe('ApplyTaxComponent', () => {
  let component: ApplyTaxComponent;
  let fixture: ComponentFixture<ApplyTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyTaxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
