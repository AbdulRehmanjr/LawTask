import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptioncardComponent } from './subscriptioncard.component';

describe('SubscriptioncardComponent', () => {
  let component: SubscriptioncardComponent;
  let fixture: ComponentFixture<SubscriptioncardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptioncardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptioncardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
