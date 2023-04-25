import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPortionComponent } from './main-portion.component';

describe('MainPortionComponent', () => {
  let component: MainPortionComponent;
  let fixture: ComponentFixture<MainPortionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPortionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPortionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
