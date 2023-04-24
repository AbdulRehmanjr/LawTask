import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerapprovaldetailComponent } from './sellerapprovaldetail.component';

describe('SellerapprovaldetailComponent', () => {
  let component: SellerapprovaldetailComponent;
  let fixture: ComponentFixture<SellerapprovaldetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerapprovaldetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerapprovaldetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
