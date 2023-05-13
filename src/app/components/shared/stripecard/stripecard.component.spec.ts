import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripecardComponent } from './stripecard.component';

describe('StripecardComponent', () => {
  let component: StripecardComponent;
  let fixture: ComponentFixture<StripecardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StripecardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StripecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
