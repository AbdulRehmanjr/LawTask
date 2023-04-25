import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestSellerComponent } from './request-seller.component';

describe('RequestSellerComponent', () => {
  let component: RequestSellerComponent;
  let fixture: ComponentFixture<RequestSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestSellerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
