import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilessharingComponent } from './filessharing.component';

describe('FilessharingComponent', () => {
  let component: FilessharingComponent;
  let fixture: ComponentFixture<FilessharingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilessharingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilessharingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
