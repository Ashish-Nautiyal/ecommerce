import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GivePromocodeComponent } from './give-promocode.component';

describe('GivePromocodeComponent', () => {
  let component: GivePromocodeComponent;
  let fixture: ComponentFixture<GivePromocodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GivePromocodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GivePromocodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
